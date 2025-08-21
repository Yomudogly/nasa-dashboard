# Backend Documentation: NASA Dashboard

## 1. Overview

The backend is a lightweight, high-performance API server built with Fastify. Its primary role is to act as a middleware between the React frontend and the official NASA NeoWs API. It handles data fetching, transformation, caching, and validation.

## 2. Technology Stack

- **Framework:** Fastify (Node.js)
- **Language:** TypeScript
- **Caching:** Redis
- **Validation:** AJV (integrated with Fastify)
- **API Specification:** OpenAPI 3.0
- **API Documentation:** Swagger UI (`@fastify/swagger-ui`)
- **Testing:** Jest

## 3. Architecture

The backend is a single-purpose service with one primary responsibility: serving near-Earth object data.

- **Request Lifecycle:**
    1. The frontend sends a `GET` request to `/api/v1/objects`.
    2. Fastify validates the incoming request's query parameters (`start`, `end`, `sort`) against the AJV schema.
    3. The server checks if a valid, non-expired response for this query exists in the Redis cache.
    4. **Cache Hit:** If found, the cached data is returned immediately to the client.
    5. **Cache Miss:**
      - The server constructs the appropriate request to the NASA NeoWs API.
      - It fetches the data from NASA.
      - It transforms the raw NASA data into the clean, simplified format required by the frontend.
      - It performs the requested sorting on the transformed data.
      - The transformed, sorted data is stored in the Redis cache with a Time-to-Live (TTL).
      - The data is sent as the response to the frontend.

## 4. Data Transformation

The backend is responsible for transforming the verbose data structure from the NASA API into a clean, efficient format for the frontend. This includes performing calculations and unit conversions.

- **Input (from NASA API):** A complex JSON object containing nested data for each object with units in miles and miles_per_second.
- **Output (to Frontend):** A simple array of objects, where each object has the following simplified structure with units in miles and miles_per_hour:

  ```json
    {
      "id": "string",
      "name": "string",
      "size": "number",
      "close_approach": "number",
      "velocity": "number",
      "is_potentially_hazardous": "boolean"
    }
  ```

- **Transformation Logic:**
  - `size`: Calculated as the average of the minimum and maximum estimated diameter in **miles**.
  - `close_approach`: The miss distance in **miles**.
  - `velocity`: The relative velocity in **miles per hour**.

## 6. Caching Strategy

- **Tool:** Redis
- **Key Generation:** The cache key will be generated based on the request query parameters (e.g., `neos:2025-08-01:2025-08-02:proximity`).
- **TTL (Time-to-Live):** A reasonable TTL (e.g., 6-12 hours) will be set for cached data, as near-Earth object data for a given day does not change frequently. This balances performance with data freshness.
