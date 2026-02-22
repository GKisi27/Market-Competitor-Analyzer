from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:0490036@localhost:5432/Market_competitor_Analyzer")
    PROJECT_NAME: str = "Market Competitor Analyzer"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()