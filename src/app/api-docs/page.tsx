"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Swagger UI
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "REST API for managing tasks",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/tasks": {
      get: {
        summary: "Get all tasks",
        description: "Retrieve a list of all tasks",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new task",
        description: "Create a new task with title and description",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: {
                    type: "string",
                    description: "Task title",
                  },
                  description: {
                    type: "string",
                    description: "Task description (optional)",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Bad request - invalid input",
          },
        },
      },
    },
    "/api/tasks/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "Task ID",
        },
      ],
      put: {
        summary: "Update a task",
        description: "Update an existing task by ID",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Task title",
                  },
                  description: {
                    type: "string",
                    description: "Task description",
                  },
                  completed: {
                    type: "boolean",
                    description: "Task completion status",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          404: {
            description: "Task not found",
          },
          400: {
            description: "Bad request - invalid input",
          },
        },
      },
      delete: {
        summary: "Delete a task",
        description: "Delete a task by ID",
        responses: {
          200: {
            description: "Task deleted successfully",
          },
          404: {
            description: "Task not found",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Unique task identifier",
          },
          title: {
            type: "string",
            description: "Task title",
          },
          description: {
            type: "string",
            description: "Task description",
          },
          completed: {
            type: "boolean",
            description: "Task completion status",
            default: false,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Task creation timestamp",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "Task last update timestamp",
          },
        },
        required: ["id", "title", "completed", "createdAt", "updatedAt"],
      },
    },
  },
};

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-md shadow-gray-900/20 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Task Manager API Documentation
        </h1>
        <div className="swagger-ui-container">
          <SwaggerUI spec={swaggerSpec} />
        </div>
      </div>
    </div>
  );
}
