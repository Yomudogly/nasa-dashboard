---
mode: 'agent'
description: 'Generates the complete backend for the NASA Dashboard project, including a Fastify server, API endpoints, Redis caching, data transformation, and Docker setup.'
tools: ['editFiles', 'runCommands']
---

# **Generate NASA Dashboard Backend**

Your task is to create the complete backend for the NASA Dashboard project. You will build a high-performance Fastify server in TypeScript that fetches data from the NASA NeoWs API, transforms it, caches it with Redis, and serves it to the frontend.

Follow the detailed instructions in the project's documentation (docs/backend.md, docs/api.md, docs/database-schema.md, and docs/devops.md).

## **Instructions:**

### **1. Initialize the Project**

* Inside the backend/ directory, initialize a new Node.js project.  
* Install all necessary dependencies for a Fastify server with TypeScript, including fastify, @fastify/swagger, @fastify/swagger-ui, redis, typescript, ts-node, nodemon, and the required testing libraries (jest, ts-jest, @types/jest).  
* Configure tsconfig.json for a modern Node.js project.  
* Set up nodemon.json to automatically restart the server during development.

### **2. Create the Server and API Endpoint**

* Create the main server file (backend/src/server.ts).  
* Implement a Fastify server instance.  
* Create the GET /api/v1/objects endpoint as specified in docs/api.md.  
* Implement request schema validation for the start, end, and sort query parameters using Fastify's built-in support for AJV.  
* Set up Swagger UI documentation at the /docs endpoint.

### **3. Implement Data Fetching and Transformation**

* Create a service or module responsible for communicating with the NASA NeoWs API.  
* Implement the data transformation logic to convert the raw, verbose API response into the clean, simplified format required by the frontend. This includes:  
  * Calculating the average size in miles.  
  * Ensuring the miss distance is in miles.  
  * Converting the relative velocity to miles per hour.

### **4. Implement Redis Caching**

* Integrate a Redis client into the application.  
* Before fetching data from the NASA API, check if a valid, non-expired response for the same query (start, end, sort) exists in the Redis cache.  
* If a cached response is found (a cache hit), return it immediately.  
* If no cached response is found (a cache miss), fetch the data from the NASA API, transform it, store the result in Redis with a reasonable TTL (e.g., 12 hours), and then return it.

### **5. Create the Docker Environment**

* Write a multi-stage Dockerfile for the backend service that:  
  * Has a build stage to install dependencies and compile the TypeScript code.  
  * Has a lean production stage that copies only the necessary build artifacts and production dependencies.  
* Update the docker-compose.yml file in the project root to include the backend service and a Redis service.

### **6. Update the todo.md**

* After completing each major step, update the todo.md file at the project root to mark the corresponding backend tasks as complete.