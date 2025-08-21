---
mode: 'agent'
description: 'Generates the complete frontend for the NASA Dashboard project, including a React + Vite application, Tailwind CSS styling, TanStack Query for state management, and an interactive UI.'
tools: ['runCommands', 'editFiles']
---


# **Generate NASA Dashboard Frontend**

Your task is to create the complete frontend for the NASA Dashboard project. You will build a modern, performant, and visually stunning single-page application using React, Vite, and Tailwind CSS. The application will fetch data from the backend, manage it with TanStack Query, and display it in an interactive and responsive interface.

Follow the detailed instructions in the project's documentation (docs/frontend.md, docs/state-management.md, docs/user-flow.md, and docs/performance-optimization.md).

## **Instructions:**

### **1. Initialize the Project**

* Inside the frontend/ directory, initialize a new React project using Vite with the TypeScript template.  
* Install all necessary dependencies, including react, react-dom, tailwindcss, postcss, autoprefixer, @tanstack/react-query, and the required testing libraries (jest, react-testing-library, playwright).  
* Configure tailwind.config.js and postcss.config.js to set up Tailwind CSS.

### **2. Implement the UI and Layout**

* Create the main application layout as described in docs/frontend.md, featuring the "glassmorphism" UI panel and the main space visualization area.  
* Implement the deep space theme with a parallax starfield background.  
* Ensure the entire application is fully responsive and mobile-friendly from the start.

### **3. Build Core Components**

* **Data Display:**  
  * Create an ObjectList component to display the list of near-Earth objects.  
  * Create an ObjectListItem component for individual entries in the list.  
* **Controls:**  
  * Implement a DatePicker component to allow users to select a date.  
  * Implement sorting controls (e.g., a dropdown or buttons) to sort the data.  
* **Visualization:**  
  * Create an ObjectVisualization component to render the objects in the "deep space" scene. This can be done using HTML/CSS or SVG elements.

### **4. Implement State Management and Data Fetching**

* **Server State:**  
  * Create a custom hook, useNearEarthObjects(date, sort), that uses TanStack Query's useQuery to fetch data from the backend API.  
  * The query key should be dynamic, incorporating the date and sort parameters to ensure proper caching (e.g., ['neos', '2025-08-01', 'size']).  
* **UI State:**  
  * Use local component state (useState) to manage the selected date and the current sorting option.

### **5. Add Interactivity**

* Implement the user flow described in docs/user-flow.md.  
* Hovering/clicking on an item in the ObjectList should highlight the corresponding object in the ObjectVisualization, and vice-versa.  
* Clicking/tapping an object should display a pop-up or modal with its key details.

### **6. Create the Docker Environment**

* Write a multi-stage Dockerfile for the frontend service that:  
  * Has a build stage to install dependencies and build the static assets using Vite.  
  * Has a lean production stage (e.g., using an Nginx server) to serve the built static files.  
* Update the docker-compose.yml file in the project root to include the frontend service.

### **7. Update the todo.md**

* After completing each major step, update the todo.md file at the project root to mark the corresponding frontend tasks as complete.
