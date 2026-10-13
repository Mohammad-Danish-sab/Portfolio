import json
import os
import shutil
import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, Header, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse

# Note: prefix is empty because main.py mounts this router with prefix="/api/v1"
router = APIRouter(prefix="/projects", tags=["Projects"])

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_file(file: UploadFile) -> str:
    """Saves uploaded file and returns accessible static path."""
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return f"/static/uploads/{filename}"


def verify_admin_key(admin_key: str):
    """Admin passcode verification helper."""
    if admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Admin Passcode. Action not permitted.",
        )


def parse_technologies(technologies_input: str) -> List[str]:
    """Converts JSON array strings or comma-separated strings into a Python List[str]."""
    if not technologies_input:
        return []

    try:
        parsed = json.loads(technologies_input)
        if isinstance(parsed, list):
            return [str(item).strip() for item in parsed if str(item).strip()]
    except (json.JSONDecodeError, TypeError):
        pass

    return [t.strip() for t in str(technologies_input).split(",") if t.strip()]


# --- PUBLIC ROUTES ---

@router.get("", response_model=List[ProjectResponse])
@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Project)
    if category:
        query = query.filter(Project.category == category)
    return query.all()


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


# --- ADMIN-ONLY ROUTES ---

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    technologies: str = Form(...),
    github_url: Optional[str] = Form(None),
    live_url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    screenshots: List[UploadFile] = File(default=[]),
    x_admin_key: str = Header(..., alias="x-admin-key"),
    db: Session = Depends(get_db),
):
    verify_admin_key(x_admin_key)

    tech_list = parse_technologies(technologies)
    image_url = save_file(image) if image and image.filename else None
    screenshot_urls = [
        save_file(shot) for shot in screenshots if shot and shot.filename
    ]

    db_project = Project(
        title=title,
        description=description,
        category=category,
        technologies=tech_list,
        github_url=github_url,
        live_url=live_url,
        image_url=image_url,
        screenshots=screenshot_urls,
    )

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    technologies: str = Form(...),
    github_url: Optional[str] = Form(None),
    live_url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    screenshots: List[UploadFile] = File(default=[]),
    x_admin_key: str = Header(..., alias="x-admin-key"),
    db: Session = Depends(get_db),
):
    verify_admin_key(x_admin_key)

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    tech_list = parse_technologies(technologies)

    project.title = title
    project.description = description
    project.category = category
    project.technologies = tech_list
    project.github_url = github_url
    project.live_url = live_url

    if image and image.filename:
        project.image_url = save_file(image)

    valid_screenshots = [
        shot for shot in screenshots if shot and shot.filename
    ]
    if valid_screenshots:
        project.screenshots = [save_file(shot) for shot in valid_screenshots]

    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_200_OK)
def delete_project(
    project_id: int,
    x_admin_key: str = Header(..., alias="x-admin-key"),
    db: Session = Depends(get_db),
):
    verify_admin_key(x_admin_key)

    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return {"message": f"Project with ID {project_id} deleted successfully."}