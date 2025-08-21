# **DevOps Plan: NASA Dashboard**

## **1. Overview**

This document outlines the strategy for building, testing, and deploying the NASA Dashboard application. The core philosophy is to use containerization to ensure consistency and portability across all environments.

## **2. Containerization**

* **Strategy:** Both the frontend (React) and backend (Fastify) applications will be containerized using **Docker**.  
* **Dockerfile:** Each service will have its own multi-stage Dockerfile.  
  * **Build Stage:** Installs dependencies, compiles TypeScript, and builds the production-ready assets.  
  * **Production Stage:** Copies only the necessary built assets into a lightweight base image (e.g., node:alpine) for a small and secure final image.  
* **docker-compose.yml:** A docker-compose.yml file will be created to orchestrate the services for local development. This will define the frontend, backend, and redis services, making it easy to spin up the entire development environment with a single command (docker-compose up).

## **3. Continuous Integration / Continuous Deployment (CI/CD)**

* **Tool:** GitHub Actions  
* **Workflow Triggers:** Workflows will be triggered on pushes to the main branch and on the creation of pull requests.  
* **CI Pipeline Steps:**  
  1. **Checkout Code:** Checks out the latest commit.  
  2. **Setup Environment:** Sets up Node.js and caches dependencies.  
  3. **Install Dependencies:** Runs npm install.  
  4. **Lint & Format:** Runs ESLint and Prettier to enforce code quality.  
  5. **Run Tests:** Executes the full test suite (Jest unit tests and Playwright E2E tests).  
  6. **Build Docker Images:** Builds the production Docker images for both frontend and backend.  
* **CD Pipeline Steps (on merge to main):**  
  1. **Run CI Steps:** All the CI steps are executed first.  
  2. **Push to Registry:** If all checks pass, the newly built Docker images are tagged and pushed to a container registry (e.g., Docker Hub, GitHub Container Registry).  
  3. **Deploy:** A final step will trigger a deployment on the chosen hosting platform by pulling the latest image and restarting the service.

## **4. Hosting**

* **Strategy:** The containerized nature of the application allows for flexible hosting on any platform that supports Docker containers.  
* **Potential Platforms:**  
  * **Vercel/Netlify:** For the frontend, if not containerized.  
  * **Render / Fly.io / Heroku:** Excellent choices for hosting both the Fastify backend container and a managed Redis instance.  
  * **Cloud Providers (AWS, GCP, Azure):** More powerful but complex options using services like AWS ECS, Google Cloud Run, or Azure Container Apps.
  