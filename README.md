# Air Quality API

This project provides a Node.js Express API that fetches air quality data from the IQAir API, stores it in MongoDB, and provides endpoints to retrieve air quality data and the most polluted time. The project follows Domain-Driven Design (DDD) principles.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository

2. Install the dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of your project and set the following environment variables:

```env
IQAIR_API_KEY=066a42e6-0857-4ee5-bdf3-557d28f20c2b
IQAIR_BASE_URL=http://api.airvisual.com/v2
MONGO_URI=mongodb+srv://muhamadeissa92:CGua4G8oy13MSRBx@cluster0.3xqm3j5.mongodb.net/air-quality-db?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
LATITUDE=48.856613
LONGITUDE=2.352222
CRON_PATTERN=* * * * * 
```

## Running the Application

To start the server locally, use the following command:

```bash
npx nodemon src/app.js
```

The API will be available at `http://localhost:3000`.

## File Structure

Here's an overview of the project's file structure:

```
air-quality-api/
├── src/
│   ├── app.js                      # Main application entry point
│   ├── routes/
│   │   └── airQualityRoutes.js      # Defines API routes
│   ├── controllers/
│   │   └── airQualityController.js  # Controllers for handling requests
│   ├── useCases/
│   │   ├── getAirQualityUseCase.js  # Fetch air quality data use case
│   │   └── getMostPollutedTimeUseCase.js  # Get most polluted time use case
│   ├── domain/
│   │   └── entities/
│   │       └── AirQuality.js        # Domain model for Air Quality data
│   ├── infrastructure/
│   │   ├── repositories/
│   │   │   └── AirQualityRepository.js  # Repository for data persistence
│   │   ├── models/
│   │   │   └── airQualityModel.js   # Mongoose schema for air quality data
│   │   └── services/
│   │       └── iqAirService.js      # Service for interacting with the IQAir API
├── tests/                           # Test cases for the application
├── .env                             # Environment variables file
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

## API Endpoints

### `GET /api/air-quality`
Fetches air quality data for a specific location based on latitude and longitude.

**Query Parameters:**
- `lat` (required): Latitude of the location.
- `lon` (required): Longitude of the location.

**Example Request:**
```
GET /api/air-quality?lat=48.856613&lon=2.352222
```

**Response:**
```json
{
  "Result": {
    "pollution": {
      "ts": "2024-08-21T00:00:00.000Z",
      "aqius": 155,
      "mainus": "p2",
      "aqicn": 100,
      "maincn": "pm10"
    }
  }
}
```

### `GET /api/most-polluted`
Returns the most polluted time for a specific location.

**Example Request:**
```
GET /api/most-polluted
```

**Response:**
```json
{
  "ts": "2024-08-21T00:00:00.000Z",
  "aqius": 155,
  "mainus": "p2"
}
```

## Running Tests

To run the test suite, execute:

```bash
npm test
```

The tests are located in the `tests/` directory and cover the API routes and use cases.

## Technologies Used

- **Node.js**: Backend framework
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing air quality data
- **Mongoose**: MongoDB object modeling tool
- **Jest**: Testing framework
- **Supertest**: HTTP assertions for testing Express routes
- **Axios**: HTTP client for API requests
- 
