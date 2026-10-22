# Travlr Getaways — Full-Stack Travel Application

Travlr Getaways is a full-stack travel website developed for SNHU's CS 465 Full Stack Development I course. It combines a customer-facing website with an Angular single-page application (SPA) for administrators to manage travel packages.

## Technology Stack

- **MongoDB and Mongoose:** NoSQL data storage and schema-based access to trip and user records.
- **Node.js and Express:** Server-side application, routing, REST API, and MVC structure.
- **Handlebars (HBS):** Server-rendered customer-facing pages that use templates and data supplied by the application.
- **Angular and TypeScript:** Interactive administrator SPA for listing, adding, editing, and deleting trip packages.
- **JSON:** A common data format used to exchange trip and authentication data between the frontend and backend.
- **Passport, password hashing, and JSON Web Tokens (JWT):** Login authentication and protection for API operations that change trip data.

## Application Architecture

The customer-facing website is served by Express. Express routes direct requests to server-side controllers, which use the data models and database to retrieve information and render Handlebars views. The Angular administrator application is a separate frontend that communicates with the Express REST API over HTTP.

The API supports retrieving all trips and an individual trip, registering and logging in users, and creating, updating, or deleting trip records. Read operations are available without a JWT. Operations that create, update, or delete trips require a valid bearer token. The Angular HTTP interceptor attaches the stored token to outgoing requests when one is available.

## Main Features

- Customer-facing travel pages rendered with Handlebars templates.
- Trip data stored in MongoDB and accessed through Mongoose.
- REST API endpoints for trip retrieval and trip CRUD operations.
- Angular trip listing and forms for adding and editing trip packages, with delete support.
- User registration and login endpoints that return a JWT.
- Passwords stored as salted hashes rather than as plaintext.
- JWT verification on protected trip-modification endpoints.
- Angular login page and HTTP interceptor for sending bearer tokens to the API.

## Project Structure

- `app_server/` — Express routes, controllers, and Handlebars views for the customer-facing website.
- `app_api/` — API routes and controllers, Mongoose models, database connection, and authentication configuration.
- `app_admin/` — Angular administrator SPA, components, models, and HTTP services.
- `public/` — Static assets such as stylesheets, scripts, and images.
- `app.js` and `bin/` — Express application setup and server startup.

## Running the Application Locally

This is a development project. The Express backend, MongoDB, and Angular administrator app run as separate processes.

### Prerequisites

- Node.js and npm
- MongoDB running locally, unless you configure a different host
- A terminal and a browser

### 1. Configure environment variables

Create a local `.env` file in the project root. Do not commit secrets to GitHub. Set a JWT signing secret and, if needed, the MongoDB host. For example:

```env
JWT_SECRET=replace_with_a_long_random_secret
DB_HOST=127.0.0.1
```

The database connection defaults to `mongodb://127.0.0.1/travlr`. If you use a different MongoDB host, set `DB_HOST` accordingly.

### 2. Start the Express backend

From the repository root:

```bash
npm install
npm start
```

The Express server is configured for `http://localhost:3000`.

### 3. Start the Angular administrator app

In a second terminal:

```bash
cd app_admin
npm install
npm start
```

Angular's development server is configured for `http://localhost:4200`.

### 4. Use the application

Open `http://localhost:3000` for the customer-facing website and `http://localhost:4200` for the administrator SPA. Use the login page to authenticate before performing protected trip changes. The API uses the MongoDB database named `travlr`.

> **Configuration and data note:** This repository does not include a production deployment, database service, or private credentials. MongoDB must be available and the local environment must be configured before the application can run. Do not publish real passwords, JWT secrets, or other credentials.

## API Overview

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| POST | `/api/register` | Register a user | Not required |
| POST | `/api/login` | Authenticate a user and return a JWT | Not required |
| GET | `/api/trips` | Retrieve all trips | Not required |
| POST | `/api/trips` | Add a trip | JWT required |
| GET | `/api/trips/:tripCode` | Retrieve one trip by code | Not required |
| PUT | `/api/trips/:tripCode` | Update a trip | JWT required |
| DELETE | `/api/trips/:tripCode` | Delete a trip | JWT required |

## Course Reflection

### Architecture

The project uses two frontend approaches. The customer-facing website uses Express routes and Handlebars to render pages on the server, while JavaScript supports browser-side behavior. The administrator interface uses Angular as a single-page application, allowing trip lists and forms to update through API calls without reloading a separate server-rendered page for every interaction.

MongoDB was selected because travel packages and related records can be represented as documents, and Mongoose provides models and schemas to structure application data and interact with the database from Node.js.

### Functionality

JavaScript is a programming language; JSON is a text-based data format with a defined structure for representing values and objects. The application exchanges JSON data through its REST API so the Angular frontend and Express backend can communicate without sharing the same implementation language or runtime.

Refactoring helped separate responsibilities into routes, controllers, models, Angular components, and services. Reusable components and services reduce duplicated code, keep presentation separate from HTTP/data logic, and make features easier to test, maintain, and extend.

### Testing and Security

HTTP methods express the intended operation: GET retrieves data, POST creates a resource, PUT updates a resource, and DELETE removes a resource. Endpoints identify the resources those operations affect. Testing should verify both successful requests and failure cases, including missing or invalid authentication. Adding JWT security makes testing more involved because protected requests need a valid bearer token, and expired or malformed tokens should be rejected. Database inspection is also useful for confirming that a successful UI action persisted the change rather than only changing what the browser displays.

### Professional Reflection

This project provided practice connecting frontend interfaces, server-side routes, REST APIs, database models, and authentication into one application. It strengthened my understanding of how the layers of a full-stack system communicate and how to troubleshoot issues across those boundaries. Skills developed include JavaScript and TypeScript, Angular, Express, MongoDB/Mongoose, API design, JWT authentication, debugging, and documenting technical decisions. These skills support my goal of continuing to grow as a software engineer by building applications that are maintainable, testable, and secure.
