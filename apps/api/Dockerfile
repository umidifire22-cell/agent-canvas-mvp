# Base image with Node.js
FROM node:20-slim

# Install system dependencies for Remotion/Chromium
RUN apt-get update && apt-get install -y \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libgbm-dev \
    libasound2 \
    libxkbcommon-x11-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgtk-3-0 \
    libxshmfence1 \
    libglu1-mesa \
    fonts-noto-color-emoji \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose port (Fastify default in our case is 3000)
EXPOSE 3000

# Start command
CMD ["npm", "start"]
