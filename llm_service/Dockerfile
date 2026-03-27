FROM python:3.12
WORKDIR /app
RUN apt-get update && apt-get install -y \
    pkg-config \
    cmake \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]