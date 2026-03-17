from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.schemas.competitors import CompetitorSummary, CompetitorListItem, CompetitorDetail, CourseDetail
from app.models.competitors import Competitor
from app.models.price_data import PriceData
from app.models.curriculum_data import CurriculumData
from decimal import Decimal

router = APIRouter()

@router.get("/summary", response_model=CompetitorSummary)
def get_competitors_summary(db: Session = Depends(get_db)):
    active_competitors = db.query(Competitor).filter(Competitor.status == True).count()
    total_courses = db.query(CurriculumData).count()
    avg_market_price = db.query(func.avg(PriceData.price)).scalar() or 0.0
    avg_market_price_val = float(avg_market_price)
    return CompetitorSummary(
        activeCompetitors=active_competitors,
        totalCoursesTracked=total_courses,
        avgMarketPrice=round(avg_market_price_val, 2)
    )

@router.get("", response_model=list[CompetitorListItem])
def list_competitors(db: Session = Depends(get_db)):
    competitors = db.query(Competitor).all()
    results = []

    for comp in competitors:
        curriculum = db.query(CurriculumData).filter(CurriculumData.competitor_id == comp.competitor_id).all()
        course_count = len(curriculum)
        avg_price = db.query(func.avg(PriceData.price)).filter(PriceData.competitor_id == comp.competitor_id).scalar() or 0.0
        
        # Calculate average duration if possible (handling both Months and Days)
        import re
        durations = [c.duration for c in curriculum if c.duration]
        avg_dur = "N/A"
        if durations:
            months: list[float] = []
            for d in durations:
                d_lower = d.lower()
                # Priority 1: Check for "X months"
                month_match = re.search(r'(\d*\.?\d+)\s*month', d_lower)
                if month_match:
                    months.append(float(month_match.group(1)))
                    continue
                
                # Priority 2: Check for "X days"
                day_match = re.search(r'(\d*\.?\d+)\s*day', d_lower)
                if day_match:
                    months.append(float(day_match.group(1)) / 30.0)
                    continue
                
                # Priority 3: Fallback to first number found
                num_match = re.search(r'(\d*\.?\d+)', d_lower)
                if num_match:
                    months.append(float(num_match.group(1)))
            
            if months:
                avg_val = sum(months) / len(months)
                if avg_val < 1:
                    days_val = int(avg_val * 30)
                    avg_dur = f"{days_val} Days" if days_val > 0 else "N/A"
                else:
                    avg_dur = f"{avg_val:.1f} Months"
            else:
                avg_dur = durations[0] # Fallback
        
        results.append(CompetitorListItem(
            id=comp.competitor_id,
            name=comp.name,
            category=comp.industry or "Unknown",
            courses=course_count,
            avgPrice=f"Rs.{int(avg_price):,}" if avg_price else "N/A",
            avgDuration=avg_dur,
            websiteUrl=str(comp.website_url) if comp.website_url else None
        ))
    
    return results

@router.get("/{competitor_id}", response_model=CompetitorDetail)
def get_competitor_details(competitor_id: int, db: Session = Depends(get_db)):
    comp = db.query(Competitor).filter(Competitor.competitor_id == competitor_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Competitor not found")

    curriculum = db.query(CurriculumData).filter(CurriculumData.competitor_id == competitor_id).all()
    prices = db.query(PriceData).filter(PriceData.competitor_id == competitor_id).all()
    
    # Map prices by course name
    price_map = {p.product_name: p for p in prices}

    course_details = []
    total_price = Decimal(0)
    for c in curriculum:
        p = price_map.get(c.course_name)
        course_price = float(p.price) if p else 0.0
        total_price += Decimal(str(course_price))

        course_details.append(CourseDetail(
            course_name=c.course_name,
            duration=c.duration,
            level=c.level,
            price=course_price if p else None,
            currency=p.currency if p else None
        ))

    course_count = len(course_details)
    avg_price = float(total_price / min(course_count, 1)) if course_count > 0 else 0.0

    return CompetitorDetail(
        id=comp.competitor_id,
        name=comp.name,
        website_url=str(comp.website_url) if comp.website_url else None,
        industry=comp.industry,
        country=comp.country,
        total_courses=course_count,
        avg_price=f"Rs.{int(avg_price):,}",
        courses=course_details
    )
