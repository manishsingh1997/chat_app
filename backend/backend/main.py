import os
import subprocess
import asyncio
import json
import schema
import logging
import re
import jwt
import websockets.exceptions
from datetime import datetime
from models import User, TokenTable
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.security import OAuth2PasswordBearer
from authbearer import JWTBearer
from fastapi.middleware.cors import CORSMiddleware
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

CORS_ORIGINS = [    
    "http://localhost",      
    "http://localhost:5173",
    ]

app.add_middleware(    
    CORSMiddleware,    
    allow_origins=CORS_ORIGINS,  
    allow_credentials=True, 
    allow_methods=["*"],  
    allow_headers=["*"],
    )


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


@app.post('/addFriend')
def addFriend(request: schema.AddFriend, session: Session = Depends(get_session)):
    email = request.email
    env = os.environ.copy()
    userEmail = request.userEmail
    user = session.query(User).all()
    for record in user:
            if record.email == email:
                log_file_name = f"{email}.log"
                log_file_path = os.path.join(os.getcwd(), log_file_name)
                second_log_file_name = f"{userEmail}.log"
                second_log_file_path = os.path.join(os.getcwd(), second_log_file_name)

                with open(log_file_path, 'w') as log_file, open(second_log_file_path, 'w') as second_log_file:
                    return True 
                
               

@app.post('/sendMessage')
def addFriend(request: schema.SendMessage, session: Session = Depends(get_session)):
    email = request.email
    userEmail = request.userEmail
    message = request.message
    user = session.query(User).all()
    
    # email_without_domain=re.sub(r'@gmail\.com$', '', email)
    # user_email_without_domain=re.sub(r'@gmail\.com$', '', userEmail)

    
    log_file_name = f"{email}.log"
    logger1 = logging.getLogger('logger1')
    logger1.setLevel(logging.INFO)
    
    if not logger1.hasHandlers():
        handler1 = logging.FileHandler(log_file_name)
        formatter1 = logging.Formatter('%(message)s')
        handler1.setFormatter(formatter1)
        logger1.addHandler(handler1)
    
    second_log_file_name = f"{userEmail}.log"
    logger2 = logging.getLogger('logger2')
    logger2.setLevel(logging.INFO)
    if not logger2.hasHandlers():
        handler2 = logging.FileHandler(second_log_file_name)
        formatter2 = logging.Formatter('%(message)s')
        handler2.setFormatter(formatter2)
        logger2.addHandler(handler2)
        
    for record in user:
            if record.email == email:
                logger1.info(f'{email}: {message}')
                logger2.info(f'{userEmail}: {message}')
                

@app.websocket("/messages")
async def ws_read_message(websocket: WebSocket):
    try:
        await websocket.accept()
        request = await websocket.receive_json()
        emailId = request['email']        
        while True:
            try:
                with open(f"./{emailId}.log", "r") as file:
                    
                    content = file.read()
                    
                    lines = content.splitlines()
                    await websocket.send_json(json.dumps(lines))
                    await asyncio.sleep(3)
            except websockets.exceptions.ConnectionClosedOK:
                pass
            await asyncio.sleep(3)
            
    except FileNotFoundError:
        await websocket.send_json(json.dumps([]))
        
    except WebSocketDisconnect:
        await websocket.close()
    except HTTPException as e:
        await websocket.send_json({e.status_code: e.detail})
        await websocket.close()
        
        
@app.websocket("/users")
async def users(websocket: WebSocket):
    try:
        await websocket.accept()
        request = await websocket.receive_json()
        email = request['email']
        usersData = []
        while True:
            try:
                with open(f"./{email}.log", "r") as file:           
                    content = file.read()     
                    lines = content.splitlines()
                    for line in lines:
                        parts = line.split(":")
                        if len(parts) == 2:
                            key = parts[0]
                            if key != email:
                                usersData.append(key)
                    await asyncio.sleep(2)
                    await websocket.send_json(json.dumps(list(set(usersData)))) 
            except websockets.exceptions.ConnectionClosedOK:
                pass
            await asyncio.sleep(3)
        
    except FileNotFoundError:
        await websocket.send_json(json.dumps([]))
        
    except WebSocketDisconnect:
        await websocket.close()
    except HTTPException as e:
        await websocket.send_json({e.status_code: e.detail})
        await websocket.close()
    


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
