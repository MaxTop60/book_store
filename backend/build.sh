#!/usr/bin/env bash
# Render Build Script

# Установка зависимостей
pip install -r requirements.txt

# Применение миграций
python manage.py migrate

# Сбор статики (если нужно)
python manage.py collectstatic --noinput
