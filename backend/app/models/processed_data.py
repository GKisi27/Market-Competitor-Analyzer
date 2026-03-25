from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class ProcessedData(Base):
    __tablename__ = "processed_data"
   
    processed_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    raw_data_id = Column(Integer, ForeignKey("raw_data.raw_data_id", ondelete="CASCADE"), nullable=False, unique=True)
    validated = Column(Boolean, default=False)
    cleaned_payload = Column(JSONB)
    processed_at = Column(DateTime(timezone=True), server_default=func.now())
   
    # Relationships
    raw_data = relationship("RawData", back_populates="processed_data")