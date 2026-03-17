from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class KPIData(BaseModel):
    priceIndex: float
    gapScore: str
    totalCompetitors: int

class ChartDataset(BaseModel):
    label: str
    data: List[float]
    backgroundColor: Optional[Any] = None
    borderColor: Optional[Any] = None
    fill: Optional[bool] = None

class ChartData(BaseModel):
    labels: List[str]
    datasets: List[ChartDataset]

class DashboardCharts(BaseModel):
    priceChart: ChartData
    gapChart: ChartData

class WordCloudItem(BaseModel):
    text: str
    value: int

class WordCloudResponse(BaseModel):
    words: List[WordCloudItem]
