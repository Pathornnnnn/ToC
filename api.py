from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .main import *
app = FastAPI()

# ระบุ origins ที่อนุญาต
origins = [
    "http://localhost:3000",   # React dev server
    "http://localhost:5173",   # React Vite dev server
    "https://myapp.com",       # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # อนุญาต origins ที่กำหนด
    allow_credentials=True,
    allow_methods=["*"],    # ["GET", "POST", "PUT", "DELETE"]
    allow_headers=["*"],    # ["Content-Type", "Authorization"]
)

@app.get("/")
def read_root():
    return name_catagory