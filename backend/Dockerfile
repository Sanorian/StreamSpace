FROM node:22-bookworm
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install express && npm install sqlite3 --build-from-source
COPY . .
CMD ["node", "server.js"]