# NASA Near-Earth Object Dashboard

A visually immersive, web-based dashboard that displays a list of the closest objects to Earth for any given date, built with a modern, professional tech stack.

**Live Demo:** [Link to be added upon deployment]

---

## Features

- 🌌 **Immersive UI:** A stunning deep space theme with a parallax background, a "glassmorphism" UI, and an interactive visualization of near-Earth objects.
- 📅 **Date Selection:** Fetch and display objects for any selected date using a simple date picker.
- 📊 **Sorting & Filtering:** Easily sort the list of objects by size, proximity to Earth, or relative velocity.
- 📱 **Fully Responsive:** A seamless experience on all devices, from mobile phones to desktop monitors.
- 🚀 **High Performance:** Built with performance in mind, featuring a cached API and an optimized frontend.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, TanStack Query
- **Backend:** Fastify, TypeScript, Redis
- **Testing:** Jest, React Testing Library, Playwright
- **DevOps:** Docker, GitHub Actions

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) and Docker Compose

### Installation & Setup

1.**Clone the repository:**

  ```bash
    git clone [https://github.com/Yomudogly/nasa-dashboard.git](https://github.com/Yomudogly/nasa-dashboard.git)
    cd nasa-dashboard
  ```

2.**Environment Variables:**

Create a `.env` file in the `backend` directory. You can use the `DEMO_KEY` for development, but it is heavily rate-limited.
  
  ```md
    # backend/.env
    NASA_API_KEY=DEMO_KEY
  ```

3.**Build and run the containers:**

This single command will build the Docker images and start the frontend, backend, and Redis services.

  ```bash
    docker-compose up --build
  ```

The application will be available at `http://localhost:5173`.

---

## Available Scripts

- **Run All Tests:**
  
  ```bash
    # From the root directory
    npm test
  ```

- **Run Frontend Tests:**

  ```bash
    # From the frontend directory
    npm test
  ```

- **Run Backend Tests:**

  ```bash
    # From the backend directory
    npm test
  ```

- **Lint & Format:**

  ```bash
   # From the root directory
    npm run lint
    npm run format
  ```

Future Improvements (TODO)

- [ ] Implement a detailed view modal for each NEO.
- [ ] Add date range selection capabilities.
- [ ] Explore using WebGL (e.g., with Three.js) for a more advanced 3D visualization.
- [ ] Add user accounts for saving preferences or favorite objects.
