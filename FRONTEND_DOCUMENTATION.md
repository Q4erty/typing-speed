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