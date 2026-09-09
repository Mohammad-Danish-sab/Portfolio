from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI & Full Stack Developer Portfolio API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Security Key
    ADMIN_SECRET_KEY: str = "admin123"

    # Allowed frontend origins for CORS
    ALLOWED_ORIGINS: str = (
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,"
        "http://127.0.0.1:5174,http://localhost:3000,"
        "https://protofolio-3kvh.onrender.com"
    )

    # Direct database connection string
    DATABASE_URL: str

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

settings = Settings()