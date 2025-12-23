"""Rename recommendations to review_ia

Revision ID: a1b2c3d4e5f6
Revises: 0609b7759cf0
Create Date: 2025-12-23 22:20:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a1b2c3d4e5f6'
down_revision = '0609b7759cf0'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Rename recommendations column to review_ia
    op.alter_column('technical_tests', 'recommendations', new_column_name='review_ia')


def downgrade() -> None:
    # Rename review_ia column back to recommendations
    op.alter_column('technical_tests', 'review_ia', new_column_name='recommendations')
