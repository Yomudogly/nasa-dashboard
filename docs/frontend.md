# Frontend Documentation: NASA Dashboard

## 1. Overview

The frontend is a single-page application (SPA) built with React. It is responsible for rendering the user interface, managing user interactions, and fetching data from the Fastify backend. The primary goal is to provide a visually stunning, performant, and responsive experience based on the UI vision.

## 2. Technology Stack

- **Framework:** React 18+ (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI (for accessible, unstyled component primitives like dropdowns and modals)
- **State Management (Server):** TanStack Query (React Query) for fetching, caching, and managing data from the backend.
- **Testing:**
  - **Unit/Component:** Jest & React Testing Library
  - **End-to-End:** Playwright

## 3. Project Structure

The project will follow a feature-based folder structure to keep related components, hooks, and types organized.

```md
src/
├── assets/
│ └── ... # Images, fonts, etc.
├── components/
│ ├── ui/ # Reusable, generic UI components (Button, Modal, DatePicker)
│ └── layout/ # Layout components (Header, Sidebar, etc.)
├── features/
│ └── neo/
│ ├── components/ # NEO-specific components (ObjectList, ObjectVisualization)
│ ├── hooks/ # Custom hooks for NEO data fetching
│ └── types/ # TypeScript types for NEO data
├── lib/
│ └── ... # API client, utility functions
├── pages/
│ └── DashboardPage.tsx # Main page component
└── App.tsx
```

## 4. UI Vision & Implementation

- **Theme:** A dark, deep space theme will be implemented using Tailwind's color palette and `dark` mode variants.
- **Layout:**
  - The main layout will use CSS Flexbox or Grid to position the left-side UI panel and the main visualization area.
  - The Earth and parallax star background will be implemented using CSS transforms and potentially a lightweight library like `react-parallax` for the effect.
- **Glassmorphism Panel:** The semi-transparent, blurred panel effect will be achieved using Tailwind's backdrop-filter utilities (`backdrop-blur`).
- **Visualization:** The interactive space scene will be rendered using HTML/CSS or SVG elements. When data is fetched, objects will be dynamically positioned in the viewport. Interactions (hover, click) will be managed with React state, toggling CSS classes for highlighting effects.

## 5. State Management

- **Server State:** TanStack Query is the single source of truth for all data fetched from the backend. It will handle caching, re-fetching, and loading/error states automatically.
  - A primary query hook, `useNearEarthObjects`, will be created to fetch data based on the selected date and sorting parameters.
- **UI State:** Local component state (`useState`, `useReducer`) will be used for managing UI-specific data, such as the state of the date picker, dropdowns, and modal visibility. There is no anticipated need for a global state manager like Redux or Zustand.

## 6. Performance Optimizations

- **Code Splitting:** `React.lazy` will be used to split out heavy components or libraries that are not needed on the initial load.
- **Asset Optimization:** Images and other assets will be optimized for the web.
- **Memoization:** `React.memo` will be used to prevent unnecessary re-renders of complex components.
