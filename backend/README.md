# NASA Dashboard Backend

A high-performance Fastify API server that fetches, transforms, and caches near-Earth object data from the NASA NeoWs API.

## Features

- **Fast API**: Built with Fastify for high performance
- **Data Transformation**: Converts NASA's complex API response to a simplified format
- **Redis Caching**: Caches API responses to reduce NASA API calls and improve performance
- **Request Validation**: Validates query parameters using AJV schemas
- **OpenAPI Documentation**: Interactive API docs available at `/docs`
- **TypeScript**: Fully typed for better developer experience
- **Docker Ready**: Multi-stage Dockerfile for production deployments

## Quick Start

### Using Docker Compose (Recommended)

```bash
# From the project root
docker compose up --build
```

The API will be available at `http://localhost:3001` and documentation at `http://localhost:3001/docs`.

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start Redis:**

   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7-alpine
   
   # Or using brew (macOS)
   brew install redis
   brew services start redis
   ```

3. **Set environment variables (optional):**

   ```bash
   export NASA_API_KEY=your_nasa_api_key
   export NODE_ENV=development
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `HOST` | Server host | `0.0.0.0` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `NASA_API_KEY` | NASA API key | `DEMO_KEY` |
| `NODE_ENV` | Environment | `development` |
| `LOG_LEVEL` | Log level | `info` |

## API Endpoints

### GET `/api/v1/objects`

Fetches near-Earth objects for a given date range with optional sorting.

**Query Parameters:**

- `start` (required): Start date in YYYY-MM-DD format
- `end` (required): End date in YYYY-MM-DD format  
- `sort` (optional): Sort by `size`, `closeness`, or `velocity` (default: `closeness`)

**Example:**

```bash
curl "http://localhost:3001/api/v1/objects?start=2025-08-21&end=2025-08-22&sort=size"
```

### GET `/health`

Health check endpoint that returns server status and Redis connection status.

### GET `/docs`

Interactive OpenAPI documentation (Swagger UI).

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Architecture

The backend follows a clean architecture pattern:

```md
src/
├── services/          # Business logic
│   ├── nasa.ts       # NASA API integration
│   └── redis.ts      # Redis caching
├── routes/           # API route handlers
│   └── objects.ts    # NEO endpoints
├── types/            # TypeScript type definitions
│   └── index.ts      # Shared types
└── server.ts         # Main server setup
```

## Caching Strategy

- **Cache Key**: `neos:{start_date}:{end_date}:{sort_method}`
- **TTL**: 12 hours (43,200 seconds)
- **Behavior**:
  - Cache hit: Return cached data immediately
  - Cache miss: Fetch from NASA API, transform, cache, then return

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `500` - Internal Server Error

Error responses include:

```json
{
  "statusCode": 400,
  "error": "Bad Request", 
  "message": "Detailed error message"
}
```

## Production Deployment

The backend includes a multi-stage Dockerfile optimized for production:

```bash
# Build production image
docker build -t nasa-dashboard-backend .

# Run with Redis
docker run -d --name redis redis:7-alpine
docker run -d --name backend --link redis -p 3001:3001 \
  -e REDIS_URL=redis://redis:6379 \
  -e NASA_API_KEY=your_key \
  nasa-dashboard-backend
```
