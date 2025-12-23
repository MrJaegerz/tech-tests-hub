"""Add test content fields

Revision ID: 330bdd2bb5a0
Revises: 
Create Date: 2025-12-23 18:14:48.986002

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '330bdd2bb5a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add new columns for test content
    op.add_column('technical_tests', sa.Column('test_type', sa.String(50), nullable=True))
    op.add_column('technical_tests', sa.Column('requirements_markdown', sa.Text(), nullable=True))
    op.add_column('technical_tests', sa.Column('solution_files', sa.JSON(), nullable=True))
    op.add_column('technical_tests', sa.Column('demo_url', sa.String(500), nullable=True))


def downgrade() -> None:
    # Remove added columns
    op.drop_column('technical_tests', 'demo_url')
    op.drop_column('technical_tests', 'solution_files')
    op.drop_column('technical_tests', 'requirements_markdown')
    op.drop_column('technical_tests', 'test_type')
