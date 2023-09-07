from typing import Optional
from fastapi.security.http import HTTPAuthorizationCredentials
import jwt
import os
from jwt.exceptions import InvalidTokenError
from fastapi import FastAPI, Depends, HTTPException,status
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.requests import Request
from models import TokenTable
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
ALGORITHM = os.getenv('ALGORITHM')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_REFRESH_SECRET_KEY = os.getenv('JWT_REFRESH_SECRET')

def deqodeJWT(jwtToken:str):
    try:
        payload = jwt.decode(jwtToken, JWT_SECRET_KEY, ALGORITHM)
        return payload
    except InvalidTokenError:
        return None
    
    
class JWTBearer(HTTPBearer):
    def __init__(self, auto_error:bool=False):
        super(JWTBearer, self).__init__(auto_error=auto_error)
        
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication schema")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expire token")
            
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid autherization credentials")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid = False
        
        try:
            payload = deqodeJWT(jwtoken)
            
        except:
            payload= None
        if payload:
            isTokenValid = True
        return isTokenValid
    
jwt_bearer = JWTBearer()

