from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URI = "postgresql://manishsingh:manish123456789@localhost:5432/chat_app"

engine = create_engine(DATABASE_URI, connect_args={},future=True)

SessionLocal = sessionmaker(
    autocommit = False, autoflush=False, bind= engine, future= True
)

Base = declarative_base()



