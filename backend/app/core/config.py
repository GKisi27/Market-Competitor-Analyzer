from pydantic_settings import BaseSettings
from dotenv import load_dotenv 
import os

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/competitor_db")
    PROJECT_NAME:str = "Market Competitor Analyzer"
    APP_V1_STR: str = "/api/v1"
