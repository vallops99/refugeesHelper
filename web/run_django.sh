#!/bin/sh

# wait for PSQL server to start
sleep 5

# prepare init migration
python3 manage.py makemigrations

# migrate db, so we have the latest db schema
python3 manage.py migrate

# start development server on public ip interface, on port 8000
gunicorn web.wsgi:application -w 1 -b :8000 --reload
