# **Testing Plan: NASA Dashboard**

## **1. Overview**

A comprehensive, multi-layered testing strategy will be implemented to ensure the application is reliable, robust, and free of regressions.

## **2. Unit & Component Testing**

* **Framework:** **Jest**  
* **Library:** **React Testing Library**  
* **Scope:**  
  * **Frontend:**  
    * Test individual React components in isolation. (e.g., "Does the Button component render with the correct text?").  
    * Test that components render correctly based on different props. (e.g., "Does the ObjectList component display the correct number of items?").  
    * Test utility functions.  
  * **Backend:**  
    * Test individual functions, especially the data transformation logic. (e.g., "Does the transformNasaData function correctly convert the raw API response?").  
    * Test the sorting logic.

## **3. Integration Testing**

* **Framework:** **Jest** with **Mock Service Worker (MSW)**  
* **Scope:**  
  * Test the interaction between the frontend and the (mocked) backend.  
  * **Example Flow:**  
    1. Render the main dashboard component.  
    2. MSW intercepts the outgoing API call from React Query.  
    3. MSW returns a predefined mock JSON response.  
    4. Assert that the frontend correctly processes the mock data and displays it in the list.  
  * This ensures that the frontend's data fetching, state management, and rendering logic all work together as expected without needing a live backend.

## **4. End-to-End (E2E) Testing**

* **Framework:** **Playwright**  
* **Scope:**  
  * Test complete user journeys in a real browser environment.  
  * These tests simulate real user actions and verify that the entire application stack (frontend and backend) works correctly together.  
* **Example Test Cases:**  
  * **Default Load:**  
    * Open the application.  
    * Verify that the title is visible.  
    * Verify that a list of objects is displayed.  
  * **Date Selection:**  
    * Open the application.  
    * Click the date picker and select a new date.  
    * Verify that the list of objects updates.  
  * **Sorting:**  
    * Open the application.  
    * Note the name of the first item in the list.  
    * Click the "Sort by Name (A-Z)" button.  
    * Verify that the first item in the list has changed and the list is now alphabetically sorted.
