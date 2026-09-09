from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from app.core.config import settings
from app.core.database import Base, engine

# Import model modules directly to register schemas in Base.metadata
from app.models import project, contact, skill 
from app.routers import projects, contact as contact_router, skills 

# Creates 'skills' and all other registered tables in PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    origin.strip()
    for origin in settings.ALLOWED_ORIGINS.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(contact_router.router)
app.include_router(skills.router, prefix=f"{settings.API_V1_STR}/skills", tags=["skills"])

@app.get("/")
def root():
    return {"status": "online", "message": "API Server Operational"}