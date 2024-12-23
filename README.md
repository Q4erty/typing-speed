# Frontend Documentation

<br>

### Project Description

The "Fast Typing" project is a web application designed for practicing typing speed. Users can register, log into their profiles, track their results, and receive information about their progress.

<br>

### Project Structure

The project consists of several key directories:
- **frontend/javascript** — Scripts for working with the interface and API.
- **frontend/html** — Web pages of the application.
- **frontend/css** — Styles for the pages.
- **frontend/img** — Images for the interface.

<br>

### Key Modules

#### 1. **JavaScript**

**registrationChecker.js**  
Checks that the entered username and password meet the requirements:
- Username should not be empty.
- Password should be longer than 4 characters.

**logOut.js**  
Logs the user out by removing the authorization token from `localStorage`.

**profile.js**  
Loads and displays the user's results in tabular form. Main function:
- `watchingResults()` — Sends a request to the server to retrieve the results data.

**checkerToken.js**  
Checks if the authorization token is present:
- If the token exists, a link to the profile page is displayed.
- If the token is absent, a link to the login page is displayed.

**fetch/loginFetch.js**  
Sends a POST request for user authorization. Main steps:
- Display loading screen.
- Send login and password data to the server.
- Store the token in `localStorage` upon successful authorization.

**fetch/registrationFetch.js**  
Sends a POST request for new user registration. Upon successful registration, redirects to the login page.

**fetch/addResultsFetch.js**  
Responsible for sending the game results to the server via a POST request.

**fetch/getResultsFetch.js**  
Used to retrieve previously saved results from the server via a GET request.

**script.js**  
Main game logic:
- Generates random words.
- Implements a timer and tracks game time.
- Handles errors and correct/incorrect key presses.
- Displays results (time, word count, accuracy, etc.).

#### 2. **HTML**

Main pages:
- **registration.html** — Registration form.
- **login.html** — Login form.
- **index.html** — Main page with the game field.
- **profile.html** — Displays the user's results.
- **tutorial.html** — Tutorial page.

#### 3. **CSS**

Main styles:
- **form.css** — Styles for login and registration pages.
- **style.css** — Styles for the main page and game.
- **profile.css** — Styles for the 

---

<br>
<br>
<br>

# Backend Documentation

<br>

## Project Structure Documentation

This section provides an overview of the backend project structure and describes its components. The project uses Node.js, Express, MongoDB, and other technologies to implement the API.

#### Project Directory Structure

```
├── .env
├── node_modules/
├── controllers/
│   ├── authController.js
│   └── resultsController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── GameResults.js
├── routers/
│   ├── authRouter.js
│   └── resultsRouter.js
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

#### Directory Structure Description

- **.env**  
  Configuration file for storing sensitive data (e.g., secret keys, database URLs) and environment variables. These values should not be committed to version control (e.g., Git).

- **node_modules/**  
  Directory for installed project dependencies (automatically created when installing packages via npm).

- **controllers/**  
  Folder for controllers, which handle requests, perform business logic, and interact with models. In this project, there are two controllers:
  - `authController.js`: Handles user registration and authentication.
  - `resultsController.js`: Handles adding and retrieving game results.

- **middleware/**  
  Folder for middleware functions. This project contains one middleware:
  - `authMiddleware.js`: Verifies the presence and validity of the JWT token for protected routes.

- **models/**  
  Folder for data models used for interacting with the database. In this project, there are two models:
  - `User.js`: User model with fields `username`, `password`, and an array of game results.
  - `GameResults.js`: Game result model with fields like `duration`, `number_of_words`, `accuracy`, etc.

- **routers/**  
  Folder for route handlers (routers) that define how to handle requests to specific API endpoints. This project has two routers:
  - `authRouter.js`: Handles routes for authentication (registration, login).
  - `resultsRouter.js`: Handles routes for working with game results (adding and retrieving).

- **package-lock.json**  
  Honestly, I don't know what it is.

- **package.json**  
  Defines the project’s dependencies, scripts, and metadata. This file is automatically created when the project is initialized via npm.

- **server.js**  
  The main file responsible for starting the server. It configures the Express application, connects to the database, and sets up routes.

- **README.md**  
  A Markdown file that provides documentation for the project, explaining how to set it up and use it.

---

### Detailed Component Descriptions

#### 1. **server.js**

This file is responsible for starting the Express server. It connects all the necessary routes and connects to the MongoDB database using Mongoose.

- **Dependencies**:
  - `express`: A library for building web servers.
  - `mongoose`: A library for working with MongoDB.
  - `dotenv`: A library for loading environment variables.
  - `cors`: Middleware for enabling cross-origin resource sharing.

- **Main Code**:
  - Loads environment variables from `.env`.
  - Connects to MongoDB.
  - Starts the server on the specified port.
  - Sets up routes for authentication and game results.

#### 2. **controllers/authController.js**

The controller for user authentication (registration and login).

- **Registration**: 
  - Checks that the password meets the requirements and that the username is unique.
  - Hashes the password before saving it to the database.
  - Creates a new user and saves it in the database.
  - Returns a success message for registration.

- **Login**:
  - Checks if the user with the given username exists.
  - Compares the entered password with the hashed password in the database.
  - Generates a JWT token for user authentication.

#### 3. **controllers/resultsController.js**

Controller for working with game results.

- **Add Results**:
  - Uses `authMiddleware` to ensure the user is authenticated.
  - Saves game results (such as duration, word count, and errors) to the user's document in the `gameResults` field.

- **Get Results**:
  - Uses `authMiddleware` to ensure the user is authenticated.
  - Retrieves and returns all the game results for the authenticated user.

#### 4. **middleware/authMiddleware.js**

A middleware function for checking the JWT token in the request headers.

- Checks if a token exists in the `Authorization` header.
- If the token exists, it decodes it using the secret key and attaches the user data to the request object.
- If the token is missing or invalid, it returns a 401 (Unauthorized) error.

#### 5. **models/User.js**

The user model that defines the structure of the user document in the database.

- Fields:
  - `username`: A unique username for the user.
  - `password`: The hashed password.
  - `gameResults`: An array of game result objects.

#### 6. **models/GameResults.js**

The model for game results.

- Fields:
  - `duration`: Duration of the game.
  - `number_of_words`: Number of words typed.
  - `number_of_characters`: Number of characters typed.
  - `mistakes`: Number of mistakes made during the game.
  - `accuracy`: Accuracy percentage.
  - `wpm`: Words per minute.
  - `csp`: Characters per second.
  - `date`: The date and time the result was recorded.

#### 7. **routers/authRouter.js**

Router for authentication-related routes.

- Routes:
  - `/registration`: POST request for registering a new user.
  - `/login`: POST request for user login.

#### 8. **routers/resultsRouter.js**

Router for working with game results.

- Routes:
  - `/addResults`: POST request for adding game results.
  - `/getResults`: GET request for retrieving all game results.



### Conclusion

The project structure is organized to separate concerns into controllers, routes, models, and middleware, making the project more maintainable and scalable. Each component handles its respective part of the application, allowing for easy updates and enhancements as needed.

---
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
