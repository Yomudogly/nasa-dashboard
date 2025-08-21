# **State Management: NASA Dashboard**

## **1. Overview**

The state management strategy for this application is designed to be modern, simple, and efficient, leveraging specialized libraries for their intended purpose.

## **2. Server State**

* **Primary Tool:** **TanStack Query (React Query)**  
* **Responsibility:** Managing all asynchronous data that comes from the backend API. This includes fetching, caching, synchronizing, and updating server state.  
* **Implementation:**  
  * A custom hook, useNearEarthObjects(date, sort), will be created to abstract the data fetching logic.  
  * This hook will use TanStack Query's useQuery hook internally.  
  * The queryKey will be an array that includes the date and sort parameters (e.g., ['neos', '2025-08-01', 'size']). This ensures that requests with different parameters are cached independently.  
* **Benefits:**  
  * **Caching:** Drastically reduces the number of API calls by serving cached data when available.  
  * **Automatic Re-fetching:** Intelligently re-fetches data in the background to keep it fresh.  
  * **Simplified UI Logic:** Provides simple isLoading, isError, and data states, which makes rendering different UI states trivial.

## **3. UI State**

* **Primary Tool:** **Local Component State (React Hooks)**  
* **Responsibility:** Managing data that is local to a specific component and describes the state of the UI.  
* **Implementation:**  
  * useState will be used for simple state, such as the currently selected date, the current sort option, or the visibility of a modal.  
  * useReducer may be used for more complex component state that involves multiple sub-values or state transitions.  
* **Global State:** There is **no requirement for a global UI state manager** like Redux, Zustand, or Context API for the current scope of the project. The combination of TanStack Query for server state and local hooks for UI state is sufficient and preferred for its simplicity.
