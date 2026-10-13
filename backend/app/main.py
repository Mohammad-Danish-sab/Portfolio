from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from app.core.config import settings
from app.core.database import Base, engine

# Import model modules to register tables in Base.metadata
from app.models import project, contact, skill 
from app.routers import projects, contact as contact_router, skills 

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Parse allowed origins cleanly from settings or fallback list
origins = [
    origin.strip()
    for origin in settings.ALLOWED_ORIGINS.split(",")
    if origin.strip()
] if hasattr(settings, "ALLOWED_ORIGINS") else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with explicit API V1 prefixes
app.include_router(projects.router, prefix=f"{settings.API_V1_STR}", tags=["Projects"])
app.include_router(contact_router.router, prefix=f"{settings.API_V1_STR}", tags=["Contact"])
app.include_router(skills.router, prefix=f"{settings.API_V1_STR}", tags=["Skills"])

@app.get("/")
def root():
    return {"status": "online", "message": "API Server Operational"}