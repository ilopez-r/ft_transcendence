# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY config/package*.json ./
COPY config/tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source files to the expected location
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist/ /usr/share/nginx/html/dist/

# Copy website files
COPY website/ /usr/share/nginx/html/

# Create necessary directories and set permissions
RUN mkdir -p /usr/share/nginx/html/dist && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
