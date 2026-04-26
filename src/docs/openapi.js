const openApiDocument = {
  openapi: "3.0.0",
  info: {
    title: "School Management API",
    version: "1.0.0",
    description: "APIs to add schools and list them by distance from a user location."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development"
    }
  ],
  paths: {
    "/addSchool": {
      post: {
        summary: "Add a school",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "address", "latitude", "longitude"],
                properties: {
                  name: { type: "string", example: "Delhi Public School" },
                  address: { type: "string", example: "Mathura Road, New Delhi" },
                  latitude: { type: "number", example: 28.5821 },
                  longitude: { type: "number", example: 77.2461 }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "School added successfully" },
          400: { description: "Validation failed" }
        }
      }
    },
    "/listSchools": {
      get: {
        summary: "List schools sorted by proximity",
        parameters: [
          {
            in: "query",
            name: "latitude",
            required: true,
            schema: { type: "number", example: 28.6139 }
          },
          {
            in: "query",
            name: "longitude",
            required: true,
            schema: { type: "number", example: 77.209 }
          }
        ],
        responses: {
          200: { description: "Sorted schools with distance_km" },
          400: { description: "Validation failed" }
        }
      }
    }
  }
};

module.exports = openApiDocument;
