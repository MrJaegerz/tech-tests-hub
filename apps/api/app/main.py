from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import health, tests

app = FastAPI(
    title="Technical Tests API",
    version="1.0.0",
    description="API for managing technical tests",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router)
app.include_router(tests.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Technical Tests API", "version": "1.0.0"}
