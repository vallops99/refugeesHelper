FROM python:3.9-alpine

ENV AUTHOR valerio.farrotti@gmail.com
ENV UPDATED 20220301

WORKDIR /usr/src/app/

RUN apk add --update postgresql-libs gcc musl-dev postgresql-dev \
    libffi-dev zlib-dev jpeg-dev ffmpeg

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --ignore-installed -r requirements.txt

RUN apk del -r postgresql

COPY . .

# ENTRYPOINT ["tail", "-f", "/dev/null"]
