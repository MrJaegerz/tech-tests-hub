import jwt
from app.config import settings


def verify_jwt_token(token: str) -> str | None:
    """
    Verify Supabase JWT token and extract user_id

    Args:
        token: JWT token string

    Returns:
        user_id if valid, None otherwise
    """
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
