from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.schemas.analytics import (
    PriceIndexResponse, PriceIndexSummary, CourseComparisonItem, 
    CompetitorPricingOverview, GapAnalysisResponse, GapAnalysisSummary,
    CompetitorCourseItem
)
from app.schemas.dashboard import ChartData, ChartDataset
from app.models.competitors import Competitor
from app.models.price_data import PriceData
from app.models.curriculum_data import CurriculumData
from decimal import Decimal

router = APIRouter()

@router.get("/price-index", response_model=PriceIndexResponse)
def get_price_index(db: Session = Depends(get_db)):
    try:
        # Summary Calculations
        total_avg_market = db.query(func.avg(PriceData.price)).scalar() or 0.0
        our_avg_price = 25000.0 # Mocked as requested in UI
        
        price_index = float((our_avg_price / float(total_avg_market)) * 100) if total_avg_market else 100.0
        
        total_courses = db.query(CurriculumData.course_name).distinct().count()
        
        summary = PriceIndexSummary(
            priceIndex=round(float(price_index), 1),
            ourAvgPrice=our_avg_price,
            coursesOverMarket=5, # Mock logic for demo
            totalCourses=total_courses
        )

        # Chart Data (Common Courses Calculation)
        # Define common course categories for keyword matching
        categories = ["React", "Java", "Python", "PHP", "Flutter", "Digital Marketing", "UI/UX", "Data Science", "Node"]
        
        # Optimize: Only fetch necessary columns and count categories using database if possible
        # For now, let's at least limit what we fetch
        cat_counts = {cat: 0 for cat in categories}
        
        for cat in categories:
            # SQL-side filtering is much faster than fetching all and filtering in Python
            count = db.query(CurriculumData).filter(CurriculumData.course_name.ilike(f"%{cat}%")).count()
            cat_counts[cat] = count

        # Get top 5 sorted by count
        sorted_cats = sorted(cat_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        labels = [x[0] for x in sorted_cats] if sorted_cats and any(c > 0 for _, c in sorted_cats) else ["React", "Python", "Java", "PHP", "Flutter"]
        counts = [x[1] for x in sorted_cats] if sorted_cats and any(c > 0 for _, c in sorted_cats) else [5, 4, 4, 3, 2]

        chart_data = ChartData(
            labels=labels,
            datasets=[
                ChartDataset(
                    label="Number of Institutes",
                    data=counts,
                    backgroundColor=["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"]
                )
            ]
        )

        # Course Comparison Table
        course_comparison = [
            CourseComparisonItem(course="React", ourPrice=25000.0, avgCompetitorPrice=32000.0),
            CourseComparisonItem(course="Node.js", ourPrice=20000.0, avgCompetitorPrice=24000.0),
            CourseComparisonItem(course="Python", ourPrice=15000.0, avgCompetitorPrice=18000.0)
        ]

        # Pricing Overview Table
        ov_data = []
        competitors = db.query(Competitor).limit(5).all()
        for comp in competitors:
            comp_avg = db.query(func.avg(PriceData.price)).filter(PriceData.competitor_id == comp.competitor_id).scalar() or 0.0
            comp_courses = db.query(CurriculumData).filter(CurriculumData.competitor_id == comp.competitor_id).count()
            ov_data.append(CompetitorPricingOverview(
                competitor=comp.name,
                avgPrice=float(comp_avg),
                courses=comp_courses,
                url=str(comp.website_url) if comp.website_url else None
            ))

        return PriceIndexResponse(
            summary=summary,
            chartData=chart_data,
            courseComparison=course_comparison,
            pricingOverview=ov_data
        )
    except Exception as e:
        import logging
        logging.error(f"Error in get_price_index: {str(e)}")
        # Provide fallback data to prevent total failure
        summary = PriceIndexSummary(priceIndex=100.0, ourAvgPrice=25000.0, coursesOverMarket=0, totalCourses=0)
        chart_data = ChartData(labels=["React", "Python", "Java"], datasets=[ChartDataset(label="Error", data=[0,0,0])])
        return PriceIndexResponse(summary=summary, chartData=chart_data, courseComparison=[], pricingOverview=[])

@router.get("/gap-analysis", response_model=GapAnalysisResponse)
def get_gap_analysis(db: Session = Depends(get_db)):
    try:
        # Fetch top 5 competitors with their real course counts
        competitors = db.query(Competitor).limit(5).all()
        labels = [c.name for c in competitors] if competitors else ["Comp1", "Comp2", "Comp3", "Comp4", "Comp5"]

        # Get real course count per competitor
        course_counts = []
        for c in competitors:
            count = db.query(CurriculumData).filter(CurriculumData.competitor_id == c.competitor_id).count()
            course_counts.append(count)

        if not course_counts:
            course_counts = [20, 15, 18, 12, 10]

        # Normalize course counts to 0-100 scale for the radar chart
        max_count = max(course_counts) if course_counts else 1
        normalized_courses = [round((v / max_count) * 100) for v in course_counts]

        # Summary
        total_courses_offered = sum(course_counts)
        avg_courses = round(total_courses_offered / len(course_counts)) if course_counts else 0
        summary = GapAnalysisSummary(
            totalGapCourses=15,
            coursesOffered=total_courses_offered,
            avgCoursesPerCompetitor=avg_courses,
            marketRelevanceScore=70
        )

        # Student enrollment data (kept as relative scores 0-100)
        student_scores = [54, 79, 20, 56, 85]
        # Pad/trim to match number of competitors
        student_scores = (student_scores + [50] * len(labels))[:len(labels)]

        chart_data = ChartData(
            labels=labels,
            datasets=[
                ChartDataset(
                    label="Courses Offered",
                    data=normalized_courses,
                    fill=True,
                    backgroundColor="rgba(255, 99, 132, 0.2)",
                    borderColor="rgb(255, 99, 132)"
                ),
                ChartDataset(
                    label="Students Enrolled",
                    data=student_scores,
                    fill=True,
                    backgroundColor="rgba(54, 162, 235, 0.2)",
                    borderColor="rgb(54, 162, 235)"
                )
            ]
        )

        # Per-competitor course counts for sidebar
        competitor_courses = [
            CompetitorCourseItem(name=c.name, courses=cnt)
            for c, cnt in zip(competitors, course_counts)
        ] if competitors else []

        return GapAnalysisResponse(
            summary=summary,
            chartData=chart_data,
            competitorCourses=competitor_courses
        )
    except Exception as e:
        import logging
        logging.error(f"Error in get_gap_analysis: {str(e)}")
        # Fallback
        summary = GapAnalysisSummary(totalGapCourses=0, coursesOffered=0, avgCoursesPerCompetitor=0, marketRelevanceScore=0)
        chart_data = ChartData(labels=["Error"], datasets=[ChartDataset(label="Error", data=[0])])
        return GapAnalysisResponse(summary=summary, chartData=chart_data, competitorCourses=[])
