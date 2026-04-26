# School Management API

Node.js, Express.js, and MySQL API for adding schools and listing them by distance from a user-provided location.

## Standout Extra

Along with the required APIs, this submission includes interactive Swagger documentation at `/api-docs`, a `/health` endpoint for deployment checks, rate limiting, security headers, and `distance_km` in the list response so evaluators can verify the proximity sort immediately.

## Tech Stack

- Node.js
- Express.js
- MySQL with `mysql2`
- Zod validation
- Swagger UI

## API Endpoints

### `POST /addSchool`

Adds a new school.

Request body:

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5821,
  "longitude": 77.2461
}
```

Success response:

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5821,
    "longitude": 77.2461
  }
}
```

### `GET /listSchools?latitude=28.6139&longitude=77.2090`

Returns all schools sorted from nearest to farthest.

Success response:

```json
{
  "success": true,
  "count": 1,
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.209
  },
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5821,
      "longitude": 77.2461,
      "distance_km": 5.06
    }
  ]
}
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update your MySQL credentials.

3. Create the database and table:

```bash
npm run db:init
```

4. Start the API:

```bash
npm run dev
```

The API will run at `http://localhost:3000`.

## Database Schema

The MySQL schema is available at `sql/schema.sql`.

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_schools_coordinates (latitude, longitude)
);
```

## Postman Collection

Import `postman/School-Management-API.postman_collection.json` into Postman. Change the `baseUrl` collection variable to the deployed API URL after hosting.

## Deployment

Recommended easy deployment path:

1. Push this project to GitHub.
2. Create a MySQL database on Railway, Render, PlanetScale, or any MySQL hosting provider.
3. Deploy the Node app on Render or Railway.
4. Add the environment variables from `.env.example` to the hosting dashboard.
5. Run `npm run db:init` once against the hosted database.

For the assignment form:

- Deliverable 1: paste your GitHub repository link.
- Deliverable 2: paste your hosted API base URL, for example `https://your-app.onrender.com`.
- Deliverable 3: paste a shared Postman collection link, or upload/import the JSON file from this repository and share it.

## Testing

```bash
npm test
```
