FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY config/package*.json ./
COPY config/tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Create directory for database
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Start command
CMD ["npm", "start"]
