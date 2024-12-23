## API Documentation

### Overview
This API allows users to register, log in, and record typing results (including words per minute, accuracy, etc.). It uses JWT-based authentication for securing endpoints and MongoDB for data storage.

- **Version**: 1.0
- **Base URL**: `/auth` for authentication, `/profile` for user results.

### Authentication

**Methods of Authentication**: JWT (JSON Web Token)
- The user needs to send a `token` in the request header for all routes that require authentication. 
- Example: `Authorization: Bearer <token>`

**Endpoints**:

1. **POST `/auth/registration`**: Register a new user.
2. **POST `/auth/login`**: Login and receive a JWT token.
3. **POST `/profile/addResulta`**: Record typing resuts.
4. **GET `/profile/getResulta`**: Getting typing resuts.

### Environment Variables
The following environment variables are required:
- **PORT**: Port number to run the server on. Default is `3000`.
- **SECRET_KEY**: Secret key used for JWT signing.
- **DATABASE_URL**: MongoDB connection string for the database.

### Endpoints

#### `/auth/registration`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "securePassword123"
  }
  ```
- **Description**: Registers a new user by taking a `username` and `password`. The password is hashed before saving to the database.
- **Validation**:
  - `username`: Must be unique.
  - `password`: Should be between 4 and 15 characters long.
- **Response**:
  - **200 OK**: Registration successful.
  - **400 Bad Request**: If the username already exists or validation fails.
  - **Example**:
    ```json
    {
      "message": "Success registration"
    }
    ```

#### `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user123",
    "password": "securePassword123"
  }
  ```
- **Description**: Authenticates the user and generates a JWT token that can be used for authenticated requests.
- **Response**:
  - **200 OK**: Returns the JWT token for further requests.
  - **400 Bad Request**: If the credentials are incorrect.
  - **Example**:
    ```json
    {
      "token": "jwt_token_here"
    }
    ```

#### `/profile/addResults`
- **Method**: `POST`
- **Authentication**: JWT token required in the `Authorization` header.
- **Request Body**:
  ```json
  {
    "duration": "120",
    "number_of_words": 50,
    "number_of_characters": 250,
    "mistakes": 3,
    "accuracy": 98,
    "wpm": 40,
    "csp": 20,
    "date": "2024-12-22T15:30:00"
  }
  ```
- **Description**: Adds a new game result for the authenticated user. The data is saved to the user's `gameResults` array.
- **Response**:
  - **200 OK**: Game result recorded successfully.
  - **400 Bad Request**: If any required fields are missing.
  - **404 Not Found**: If the user is not found.
  - **500 Internal Server Error**: In case of a server error.

#### `/profile/getResults`
- **Method**: `GET`
- **Authentication**: JWT token required in the `Authorization` header.
- **Description**: Retrieves the game results for the authenticated user.
- **Response**:
  - **200 OK**: Returns the list of game results.
  - **404 Not Found**: If the user has no game results or the user does not exist.
  - **500 Internal Server Error**: In case of a server error.
  - **Example**:
    ```json
    [
      {
        "duration": "120",
        "number_of_words": 50,
        "number_of_characters": 250,
        "mistakes": 3,
        "accuracy": 98,
        "wpm": 40,
        "csp": 20,
        "date": "2024-12-22T15:30:00"
      },
      ...
    ]
    ```

### Middleware

#### `authMiddleware.js`
This middleware checks if the request contains a valid JWT token in the `Authorization` header. If the token is valid, it allows the request to proceed; otherwise, it returns a `401 Unauthorized` error.

- **Request**: Must include a token in the `Authorization` header as `Bearer <token>`.
- **Response**:
  - **200 OK**: The request proceeds to the next route handler.
  - **401 Unauthorized**: If the token is missing, invalid, or expired.

### Models

#### `User.js`
The `User` model represents the user in the database. It includes the following fields:
- `username`: The unique username of the user.
- `password`: The hashed password of the user.
- `gameResults`: An array of game results, each entry being a subdocument from the `GameResults` schema.

```javascript
const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gameResults: [GameResults]
});
```

#### `GameResults.js`
The `GameResults` model stores the results of the user's typing session. Each entry includes the following fields:
- `duration`: The time taken for the typing session (in seconds).
- `number_of_words`: The number of words typed during the session.
- `number_of_characters`: The number of characters typed during the session.
- `mistakes`: The number of mistakes made during the session.
- `accuracy`: The typing accuracy as a percentage.
- `wpm`: Words per minute.
- `csp`: Characters per second.
- `date`: The date when the result was recorded (default is the current date).

```javascript
const GameResults = new Schema({
  duration: { type: String },
  number_of_words: { type: Number },
  number_of_characters: { type: Number },
  mistakes: { type: Number },
  accuracy: { type: Number },
  wpm: { type: Number },
  csp: { type: Number },
  date: { type: Date, default: Date.now }
});
```

### Error Handling
- **400 Bad Request**: This status code is returned if the request is malformed or missing required fields.
- **404 Not Found**: Returned if the user is not found or no results are available.
- **500 Internal Server Error**: Returned if something goes wrong on the server side.

### Example Usage

#### Registering a New User
```bash
POST /auth/registration
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Logging In
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Adding Game Results
```bash
POST /profile/addResults
Authorization: Bearer <JWT_Token>
Content-Type: application/json

{
  "duration": "180",
  "number_of_words": 75,
  "number_of_characters": 375,
  "mistakes": 2,
  "accuracy": 98,
  "wpm": 40,
  "csp": 30,
  "date": "2024-12-22T16:00:00"
}
```

#### Getting User's Game Results
```bash
GET /profile/getResults
Authorization: Bearer <JWT_Token>
```

### Conclusion
This API enables user registration, login, and the ability to record and retrieve typing game results. JWT is used for secure authentication, and MongoDB is the underlying database for storing user information and results.

This documentation covers all necessary endpoints and provides examples for interacting with the API.
