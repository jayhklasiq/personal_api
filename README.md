# Diagnosis Form Submission API

This project is a web service that provides a form for submitting diagnosis information, saves it to a MongoDB database, and provides endpoints for retrieving diagnosis data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [License](#license)

## Features

- Submit diagnosis information through a web form
- Save diagnosis data to a MongoDB database
- Retrieve all diagnosis data
- Retrieve diagnosis data by ID
- View form submission success page

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/diagnosis-form-api.git
   cd diagnosis-form-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database and configure the connection string in `data/connect.js`.

## Running the Application

1. Start the server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the home page.

## API Endpoints

- `GET /`: Home page
- `GET /dg`: Diagnosis form page
- `POST /dg`: Submit diagnosis form
- `GET /getalldg`: Retrieve all diagnosis data
- `GET /dg/:id`: Retrieve diagnosis data by ID
- `GET /success`: Form submission success page

## Swagger Documentation

The API documentation is available using Swagger. The comments in the codebase follow the Swagger syntax for easy integration.

## Sample API Requests (api.rest)

### Get Home Page

```http
GET http://localhost:3000/
```

### Get Diagnosis Form Page

```http
GET http://localhost:3000/dg
```

### Submit Diagnosis Form

```http
POST http://localhost:3000/dg
Content-Type: application/json

{
  "diagnosis": "Flu",
  "type": "Virus",
  "overview": "A common viral infection",
  "symptoms": "Fever, cough, sore throat",
  "treatments": "Rest, hydration, antiviral medications",
  "specialists": "General Practitioner, Infectious Disease Specialist",
  "contagiousMethod": "Airborne, Droplet"
}
```

### Retrieve All Diagnosis Data

```http
GET http://localhost:3000/getalldg
```

### Retrieve Diagnosis Data by ID

```http
GET http://localhost:3000/dg/{id}
```

### Form Submission Success Page

```http
GET http://localhost:3000/success
```

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

If you have any questions, feel free to contact me at [your-email@example.com].

---

## Swagger Comments

Add the following Swagger comments in your route file (`routes/appRoute.js`):

```javascript
/**
 * @swagger
 * /:
 *   get:
 *     description: Get the home page
 *     responses:
 *       200:
 *         description: Returns the home page
 */
/**
 * @swagger
 * /dg:
 *   get:
 *     description: Get the diagnosis form page
 *     responses:
 *       200:
 *         description: Returns the diagnosis form page
 */
/**
 * @swagger
 * /dg:
 *   post:
 *     description: Submit the diagnosis form
 *     parameters:
 *       - in: body
 *         name: diagnosis
 *         description: The diagnosis to create
 *         schema:
 *           type: object
 *           required:
 *             - diagnosis
 *             - type
 *             - overview
 *             - symptoms
 *             - treatments
 *             - specialists
 *             - contagiousMethod
 *           properties:
 *             diagnosis:
 *               type: string
 *             type:
 *               type: string
 *             overview:
 *               type: string
 *             symptoms:
 *               type: string
 *             treatments:
 *               type: string
 *             specialists:
 *               type: string
 *             contagiousMethod:
 *               type: string
 *     responses:
 *       201:
 *         description: Diagnosis created successfully
 *       500:
 *         description: Error submitting diagnosis form
 */
/**
 * @swagger
 * /getalldg:
 *   get:
 *     description: Retrieve all diagnosis data
 *     responses:
 *       200:
 *         description: Returns all diagnosis data
 */
/**
 * @swagger
 * /dg/{id}:
 *   get:
 *     description: Retrieve diagnosis data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The ID of the diagnosis
 *     responses:
 *       200:
 *         description: Returns diagnosis data by ID
 *       404:
 *         description: Diagnosis not found
 */
/**
 * @swagger
 * /success:
 *   get:
 *     description: Get the form submission success page
 *     responses:
 *       200:
 *         description: Returns the form submission success page
 */
```

With these comments, you can generate Swagger documentation for your API.
