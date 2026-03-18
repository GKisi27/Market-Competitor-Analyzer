from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.schemas.dashboard import ChartData

class PriceIndexSummary(BaseModel):
    priceIndex: float
    ourAvgPrice: float
    coursesOverMarket: int
    totalCourses: int

class CourseComparisonItem(BaseModel):
    course: str
    ourPrice: float
    avgCompetitorPrice: float

class CategoryComparisonItem(BaseModel):
    category: str
    yourCourses: int
    marketAverage: int

class CompetitorPricingOverview(BaseModel):
    competitor: str
    avgPrice: float
    courses: int
    url: Optional[str] = None

class PriceIndexResponse(BaseModel):
    summary: PriceIndexSummary
    chartData: ChartData
    courseComparison: List[CourseComparisonItem]
    categoryComparison: List[CategoryComparisonItem]
    pricingOverview: List[CompetitorPricingOverview]

class GapAnalysisSummary(BaseModel):
    totalGapCourses: int
    coursesOffered: int
    avgCoursesPerCompetitor: int
    marketRelevanceScore: int

class CompetitorCourseItem(BaseModel):
    name: str
    courses: int

class GapAnalysisResponse(BaseModel):
    summary: GapAnalysisSummary
    chartData: ChartData
    competitorCourses: List[CompetitorCourseItem]
