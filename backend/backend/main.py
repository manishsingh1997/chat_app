import os
import schema
import jwt
from datetime import datetime
from models import User, TokenTable
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from authbearer import JWTBearer
from functools import wraps
from dotenv import load_dotenv
from utils import create_access_token, create_refresh_token, verify_password, get_hashed_password

# Load environment variables from .env file
load_dotenv()


ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
ALGORITHM = os.getenv('ALGORITHM')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_REFRESH_SECRET_KEY = os.getenv('JWT_REFRESH_SECRET')


Base.metadata.create_all(engine)


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


app = FastAPI()


@app.post('/register')
def register(user: schema.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(User).filter_by(email=user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    encrypted_password = get_hashed_password(user.password)
    new_user = User(username=user.username, email=user.email,
                    password=encrypted_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {'message': "user Created successfully"}


@app.post('/login', response_model=schema.TokenSchema)
def login(request: schema.requestdetails, db: Session = Depends(get_session)):
    user = db.query(User).filter(User.email == request.email).first()
    print("++++++++++++++++++++>", user.email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email")
    hashed_pass = user.password
    if not verify_password(request.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")

    access = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    token_db = TokenTable(userId=user.id, accessToken=access,
                          refreshToken=refresh, status=True)
    db.add(token_db)
    db.commit()
    db.refresh(token_db)

    return {
        "access_token": access,
        "refresh_token": refresh,
    }


@app.get('/getUser')
def getUsers(dependencies=Depends(JWTBearer()), session: Session = Depends(get_session)):
    token = dependencies
    tokenUser = session.query(TokenTable).all()
    user = session.query(User).all()
    try:
        for record in tokenUser:
            if token == record.accessToken:
                for uses in user:
                    if uses.id == record.userId:
                        return {"userName": uses.username, "email": uses.email}
    except:
        return {"messages": "user not found"}


@app.get('/getAllUsers')
def getAllUsers(dependencies=Depends(JWTBearer()), session: Session = Depends(get_session)):
    user = session.query(User).all()
    newData = []
    for record in user:
        newData.append({"id": record.id, "userName": record.username,
                       "email": record.email})
    return newData


@app.post('/changePassword')
def changePassword(request: schema.changepassword, db: Session = Depends(get_session)):
    user = db.query(User).filter(User.email == request.email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    if not verify_password(request.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid old password")

    encryptedPassword = get_hashed_password(request.new_password)
    user.password = encryptedPassword
    db.commit()

    return {"message": "password changed successfully"}


@app.post('/logout')
def logout(dependencies=Depends(JWTBearer()), db: Session = Depends(get_session)):
    token = dependencies
    payload = jwt.decode(token, JWT_SECRET_KEY, ALGORITHM)
    user_id = payload['sub']
    token_record = db.query(TokenTable).all()
    info = []

    for record in token_record:
        print("record", record)
        if (datetime.utcnow()-record.createdAt).days > 1:
            info.append(record.userId)

    if info:
        existingToken = db.query(TokenTable).where(
            TokenTable.userId.in_(info)).delete()
        db.commit()

    existingToken = db.query(TokenTable).filter(
        TokenTable.userId == user_id, TokenTable.accessToken == token).first()
    if existingToken:
        existingToken.status = False
        db.add(existingToken)
        db.commit()
        db.refresh(existingToken)

    return {"message": "Login successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
