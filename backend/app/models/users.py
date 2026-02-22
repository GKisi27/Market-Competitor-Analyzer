from sqlalchemy import Column, Integer, String, Boolean
from app.database.session import Base 
from sqlalchemy.orm import relationship 

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key = True, index = True)
    full_name = Column(String, nullable = False)
    email = Column(String, unique = True, index = True, nullable = False)
    password_hash = Column(String, nullable = False)
    status = Column(Boolean, default = True)


    #Relationships 

    user_roles = relationship("UserRole", back_populates = "user", cascade = "all, delete-orphan")
    dashboards = relationship("Dashboard", back_populates = "creator", cascade = "all delete-orphan")
    reports = relationship("Report", back_populates = "generator", cascade = "all, delete-orphan")
    crawler_jobs = relationship("CrawlerJob", back_populates = "triggered_by_user", cascade = "all, delete-orphan")


    # we can do now user.user_roles, user.dashboards, etc.
    # back-populates means two ways connection
