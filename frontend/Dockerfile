# Multi-stage build for NASA Dashboard Frontend

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S frontend
RUN adduser -S frontend -u 1001

# Copy built app and set permissions
RUN chown -R frontend:frontend /usr/share/nginx/html
RUN chown -R frontend:frontend /var/cache/nginx

# Create directories nginx needs and set permissions
RUN mkdir -p /var/log/nginx /var/run
RUN chown -R frontend:frontend /var/log/nginx /var/run

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
