from sqlalchemy import Column, Integer, String, DateTime, Boolean

from database import Base

import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    
class TokenTable(Base):
    __tablename__ = 'tokens'
    userId = Column(Integer)
    accessToken = Column(String(450),primary_key=True)
    refreshToken = Column(String(450),nullable=False)
    status = Column(Boolean)
    createdAt = Column(DateTime, default=datetime.datetime.now)
