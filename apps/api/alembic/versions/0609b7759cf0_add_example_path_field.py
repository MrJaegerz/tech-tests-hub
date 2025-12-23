"""Add example_path field

Revision ID: 0609b7759cf0
Revises: b62f27df08e4
Create Date: 2025-12-23 21:02:23.374231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0609b7759cf0'
down_revision = 'b62f27df08e4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add example_path column
    op.add_column('technical_tests', sa.Column('example_path', sa.String(500), nullable=True))


def downgrade() -> None:
    # Remove example_path column
    op.drop_column('technical_tests', 'example_path')
