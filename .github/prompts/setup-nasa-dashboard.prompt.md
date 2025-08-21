---
mode: 'agent'
description: 'Scaffolds the initial project structure for the NASA Dashboard, including backend and frontend folders, and a todo.md file.'
tools: ['editFiles']
---

# Setup NASA Dashboard Project

Your task is to scaffold the initial folder structure and task list for the NASA Dashboard project, based on the provided documentation.

## Instructions:

1.  **Create Project Directories:**
    - Create a `backend` directory for the Fastify server.
    - Create a `frontend` directory for the React application.

2.  **Initialize `todo.md`:**
    - Create a `todo.md` file in the project root.
    - Populate it with the initial high-level tasks required to build the application, based on the project's PRD and technical documentation. The list should cover the main features for both the frontend and backend.

3.  **Add Placeholder Files:**
    - In the `backend` directory, create a placeholder `server.ts` file.
    - In the `frontend` directory, create a placeholder `src/App.tsx` file.

## `todo.md` Content:

Use the following as the initial content for the `todo.md` file. This list is derived from the core features outlined in the project's documentation.

```markdown
# NASA Dashboard - TODO List

## Phase 1: Project Setup & Backend Foundation

- [ ] Create `backend` and `frontend` directories.
- [ ] Initialize the backend as a Fastify project with TypeScript.
- [ ] Initialize the frontend as a React + Vite project with TypeScript and Tailwind CSS.
- [ ] Set up `docker-compose.yml` for local development (frontend, backend, redis).

## Phase 2: Backend API Development

- [ ] Implement the `GET /api/v1/objects` endpoint in Fastify.
- [ ] Add request validation for `start`, `end`, and `sort` query parameters.
- [ ] Implement the data fetching logic from the NASA NeoWs API.
- [ ] Create the data transformation logic to clean and format the NASA API response.
- [ ] Implement the sorting logic for the API response.
- [ ] Integrate Redis for caching the transformed API responses.
- [ ] Set up Swagger UI for API documentation.

## Phase 3: Frontend UI Development

- [ ] Build the main application layout (glassmorphism panel and space visualization area).
- [ ] Implement the date picker component for selecting the date.
- [ ] Implement the sorting dropdown/buttons.
- [ ] Create the `useNearEarthObjects` custom hook using TanStack Query to fetch data from the backend.
- [ ] Build the `ObjectList` component to display the fetched NEO data.
- [ ] Implement the interactive space visualization scene.
- [ ] Add interactivity: hovering over a list item highlights the object in the scene (and vice-versa).

## Phase 4: Testing & DevOps

- [ ] Write unit tests for the backend data transformation and sorting logic.
- [ ] Write component tests for the frontend UI components.
- [ ] Write end-to-end tests with Playwright to test the core user flow.
- [ ] Create multi-stage Dockerfiles for both the backend and frontend.
- [ ] Set up a GitHub Actions workflow for CI/CD.

```
