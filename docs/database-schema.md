# Database Schema: NASA Dashboard

## 1. Primary Data Storage

This application does not use a persistent database (like PostgreSQL or MongoDB) for its core functionality. The single source of truth for near-Earth object data is the official NASA NeoWs API.

## 2. Caching Layer

To ensure high performance and reduce reliance on the external NASA API, a Redis in-memory data store is used as a caching layer.

- **Purpose:** To temporarily store the transformed and sorted API responses from the NASA API.

- **Data Stored:** The JSON payloads that are sent to the frontend.

- **Eviction Policy:** Data is stored with a Time-to-Live (TTL), after which it expires and will be re-fetched from the NASA API on the next request. This ensures data remains reasonably fresh without constant API calls.
