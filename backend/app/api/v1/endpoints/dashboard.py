from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import get_db
from app.schemas.dashboard import KPIData, DashboardCharts, ChartData, ChartDataset, WordCloudResponse, WordCloudItem
from app.models.competitors import Competitor
from app.models.price_data import PriceData
from app.models.skills import Skill

router = APIRouter()

@router.get("/kpi", response_model=KPIData)
def get_kpis(db: Session = Depends(get_db)):
    total_competitors = db.query(Competitor).filter(Competitor.status == True).count()
    
    # Calculate average price index based on PriceData
    avg_price = db.query(func.avg(PriceData.price)).scalar() or 70.99
    
    return KPIData(
        priceIndex=round(float(avg_price), 2),
        gapScore="93/100", # Will need actual formula implementation based on specific metrics
        totalCompetitors=total_competitors
    )

@router.get("/charts", response_model=DashboardCharts)
def get_charts(db: Session = Depends(get_db)):
    # Price Chart Data (Skills vs Score mapping logic based on UI)
    price_chart = ChartData(
        labels=["React", "Node", "MongoDB", "SQL", "DevOps"],
        datasets=[
            ChartDataset(
                label="Skill Score",
                data=[85, 75, 70, 65, 60],
                backgroundColor=["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"]
            )
        ]
    )

    # Gap Chart Data (Competitors)
    # Get top 5 competitors for chart
    competitors = db.query(Competitor).filter(Competitor.status == True).limit(5).all()
    labels = [c.name for c in competitors] if competitors else ["Comp1", "Comp2", "Comp3", "Comp4", "Comp5"]
    
    gap_chart = ChartData(
        labels=labels,
        datasets=[
            ChartDataset(
                label="No. of Courses",
                data=[14, 9, 10, 8, 7], # Mocking based on seeded UI data or DB
                fill=True,
                backgroundColor="rgba(255, 99, 132, 0.2)",
                borderColor="rgb(255, 99, 132)"
            ),
            ChartDataset(
                label="Course Variety",
                data=[12, 8, 9, 6, 5],
                fill=True,
                backgroundColor="rgba(54, 162, 235, 0.2)",
                borderColor="rgb(54, 162, 235)"
            )
        ]
    )

    return DashboardCharts(
        priceChart=price_chart,
        gapChart=gap_chart
    )

@router.get("/wordcloud", response_model=WordCloudResponse)
def get_wordcloud(db: Session = Depends(get_db)):
    # Fetch all skills and generate mock counts since we don't have complex analytics aggregation yet
    skills = db.query(Skill).limit(20).all()
    words = []
    
    # Assigning pseudo-random weights based on ID length or just descending for visual
    base_weight = 100
    for skill in skills:
        words.append(WordCloudItem(text=skill.skill_name, value=base_weight))
        base_weight -= 4
        if base_weight < 20: base_weight = 20

    if not words:
        words = [
            WordCloudItem(text="Python", value=90),
            WordCloudItem(text="React", value=80),
            WordCloudItem(text="Node.js", value=70)
        ]

    return WordCloudResponse(words=words)
