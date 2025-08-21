# API Documentation: NASA Dashboard

## 1. Overview

This document specifies the RESTful API provided by the Fastify backend. The API is designed to be the single source of data for the NASA Dashboard frontend.

- **Specification:** OpenAPI 3.0
- **Interactive Docs:** A Swagger UI instance will be available at the `/docs` endpoint.

## 2. Endpoints

### GET `/api/v1/objects`

Fetches a list of near-Earth objects for a given date range, with optional sorting.

#### Query Parameters

| Parameter | Type   | Description                                                                                             | Required | Default   | Example      |
|-----------|--------|---------------------------------------------------------------------------------------------------------|----------|-----------|--------------|
| `start`   | string | The start date for the data query in `YYYY-MM-DD` format.                                               | Yes      | -         | `2025-08-01` |
| `end`     | string | The end date for the data query in `YYYY-MM-DD` format.                                                 | Yes      | -         | `2025-08-02` |
| `sort`    | string | The field to sort the results by. Valid options: `size`, `closeness`, `velocity`.                       | No       | `closeness` | `size`       |

#### Responses

- **`200 OK`**: Successful response.
  - **Content:** `application/json`
  - **Body:** An array of near-Earth object data.
  
  ```json
    [
      {
        "id": "3542519",
        "name": "(2010 PK9)",
        "size": 21.7,
        "close_approach": 3848501.9,
        "velocity": 22817.5,
        "is_potentially_hazardous": false
      }
    ]
  ```

- **`400 Bad Request`**: The request was malformed (e.g., invalid date format, invalid sort parameter).
  - **Content:** `application/json`
  - **Body:**
  
  ```json
    {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "Invalid query parameter: 'sort' must be one of [size, closeness, velocity]."
    }
  ```

- **`500 Internal Server Error`**: An error occurred on the server, likely while communicating with the NASA API.
  - **Content:** `application/json`
  - **Body:**
  
  ```json
    {
      "statusCode": 500,
      "error": "Internal Server Error",
      "message": "Failed to fetch data from NASA API."
    }
  ```

## 3. OpenAPI 3.0 Schema

  ```yaml
    openapi: 3.0.0
    info:
      title: NASA Dashboard API
      version: 1.0.0
      description: API for fetching near-Earth object data.
    servers:
      - url: /api/v1
    paths:
      /objects:
        get:
          summary: Get Near-Earth Objects
          description: Fetches a list of near-Earth objects for a given date range, with optional sorting.
          parameters:
            - name: start
              in: query
              required: true
              description: Start date in YYYY-MM-DD format.
              schema:
                type: string
                format: date
            - name: end
              in: query
              required: true
              description: End date in YYYY-MM-DD format.
              schema:
                type: string
                format: date
            - name: sort
              in: query
              required: false
              description: Field to sort by.
              schema:
                type: string
                enum: [size, closeness, velocity]
                default: closeness
          responses:
            '200':
              description: A list of near-Earth objects.
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      $ref: '#/components/schemas/NeoObject'
            '400':
              description: Bad Request - Invalid parameters.
            '500':
              description: Internal Server Error.

    components:
      schemas:
        NeoObject:
          type: object
          properties:
            id:
              type: string
              description: The unique ID of the object.
            name:
              type: string
              description: The name of the object.
            size:
              type: number
              description: The average estimated diameter in miles.
            close_approach:
              type: number
              description: The miss distance from Earth in miles.
            velocity:
              type: number
              description: The relative velocity in miles per hour.
            is_potentially_hazardous:
              type: boolean
              description: A flag indicating if the object is potentially hazardous.
  ```
