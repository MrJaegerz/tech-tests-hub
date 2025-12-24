from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://moi@localhost:5432/technical_tests"
    SUPABASE_JWT_SECRET: str = "dev-secret-change-me-in-production"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    API_KEY: str = "dev-api-key-change-me"  # Simple API key for write operations

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # Ignorer les variables non déclarées dans .env

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS_ORIGINS if it's a JSON string"""
        if isinstance(self.CORS_ORIGINS, str):
            try:
                return json.loads(self.CORS_ORIGINS)
            except json.JSONDecodeError:
                return [self.CORS_ORIGINS]
        return self.CORS_ORIGINS


settings = Settings()
