FROM node:22-alpine

WORKDIR /app

# Copy package workspace
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm install

# Copy seluruh source project
COPY . .

# Pindah ke aplikasi web
WORKDIR /app/apps/web

EXPOSE 4028

CMD ["npm", "run", "dev"]
