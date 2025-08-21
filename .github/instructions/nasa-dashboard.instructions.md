---
description: 'Instructions for building the NASA Dashboard project, including project structure, backend/frontend guidelines, and task tracking with todo.md.'
applyTo: '**/*'
---

# NASA Dashboard Project Instructions

## 1. Core Principles

- **Project Goal:** To create a visually immersive, high-performance web dashboard for viewing near-Earth objects (NEOs), as detailed in the project documentation.
- **Technology Stack:** The project is divided into a React frontend and a Fastify backend, both written in TypeScript. Adhere to the technologies specified in the `docs/frontend.md` and `docs/backend.md` files.
- **Code Quality:** All code should be clean, modular, and well-documented, following modern best practices.

## 2. Project Structure

The repository must be organized with a clear separation between the frontend and backend.

- **`backend/`**: Contains the Fastify API server, responsible for data fetching, caching with Redis, and transformation.
- **`frontend/`**: Contains the React single-page application, built with Vite and styled with Tailwind CSS.
- **`docs/`**: Contains all project documentation, including the PRD, API specs, and architectural plans.

## 3. Task Management with `todo.md`

A `todo.md` file must be created at the root of the project to track the development progress.

- **Initialization:** The `todo.md` file should be created with an initial set of high-level tasks derived from the project's documentation.
- **Task Format:** Use checkboxes to indicate the status of each task.
  ```markdown
  - [ ] Backend: Initialize Fastify server with TypeScript.
  - [ ] Backend: Implement Redis caching for API responses.
  - [x] Frontend: Set up the initial React project with Vite and Tailwind CSS.

 * Tracking: As tasks are completed, the corresponding checkboxes in todo.md must be updated.

## 4. Backend Development (Fastify)

 - Framework: Use Fastify with TypeScript. The backend should be a lightweight, high-performance API server.
 - Modularity: Structure the backend code into logical modules (e.g., routes, services, data transformation).
 - API: Implement the API endpoints as specified in docs/api.md. This includes request validation and appropriate response formats.
 - Data Transformation: The backend is responsible for transforming the raw data from the NASA NeoWs API into the simplified format required by the frontend.
 - Caching: Implement a caching layer using Redis to store transformed API responses, as outlined in docs/backend.md and docs/database-schema.md.

## 5. Frontend Development (React)
 - Framework: Use React 18+ with TypeScript and Vite for the build tool.
 - Styling: Use Tailwind CSS for all styling, adhering to the "deep space" and "glassmorphism" UI vision described in the documentation.
 - State Management:
   - Use TanStack Query (React Query) for managing all server state (API data fetching, caching, etc.).
   - Use local component state (React Hooks like useState) for UI state. A global UI state manager is not required for the initial project scope.
 - Components: Build reusable and well-organized components, following the feature-based structure outlined in docs/frontend.md.

## 6. DevOps and Testing
 - Containerization: Both the frontend and backend applications should be containerized using multi-stage Dockerfiles for optimized, secure production images. A docker-compose.yml file should be used to orchestrate the services for local development.
 - Testing: Follow the testing plan in docs/testing-plan.md, which includes Jest for unit tests and Playwright for end-to-end tests.