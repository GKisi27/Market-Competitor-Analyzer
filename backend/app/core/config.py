from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str
    PROJECT_NAME: str = "Market Competitor Analyzer"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    APP_ENV: str = "development"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()