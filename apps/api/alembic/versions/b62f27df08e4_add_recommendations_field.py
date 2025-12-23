"""Add recommendations field

Revision ID: b62f27df08e4
Revises: 330bdd2bb5a0
Create Date: 2025-12-23 18:49:47.514829

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b62f27df08e4'
down_revision = '330bdd2bb5a0'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add recommendations column
    op.add_column('technical_tests', sa.Column('recommendations', sa.Text(), nullable=True))


def downgrade() -> None:
    # Remove recommendations column
    op.drop_column('technical_tests', 'recommendations')
