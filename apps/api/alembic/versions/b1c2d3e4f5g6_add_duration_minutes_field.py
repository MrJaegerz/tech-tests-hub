"""Add duration_minutes field

Revision ID: b1c2d3e4f5g6
Revises: a1b2c3d4e5f6
Create Date: 2025-12-24 14:30:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b1c2d3e4f5g6'
down_revision = 'a1b2c3d4e5f6'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add duration_minutes column
    op.add_column('technical_tests', sa.Column('duration_minutes', sa.Integer(), nullable=True))


def downgrade() -> None:
    # Remove duration_minutes column
    op.drop_column('technical_tests', 'duration_minutes')
