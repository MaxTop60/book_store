from .celery import app as celery_app

__all__ = ('celery_app',)

# Автоматические миграции при старте
import os
from django.core.management import execute_from_command_line

if os.getenv('APPLY_MIGRATIONS') == 'TRUE':
    execute_from_command_line(['manage.py', 'migrate'])
