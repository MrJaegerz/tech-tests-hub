from fastapi import Header, HTTPException, status
from app.config import settings


async def verify_api_key(x_api_key: str = Header(...)) -> str:
    """
    Verify API key for write operations (POST/PUT/DELETE)

    Args:
        x_api_key: API key from X-API-Key header

    Returns:
        Fixed user_id for the admin

    Raises:
        HTTPException: If API key is invalid
    """
    if x_api_key != settings.API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
        )

    # Return a fixed user_id for admin operations
    return "admin"
