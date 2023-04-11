Thank you for checking out Game Site server.

<!-- Features/Routes -->

Right now there are several API routes that the user has access to.

(POST) http://localhost:8080/users/login
Allows the user to login using their login information and returns them a JWT token to
allows them to stay logged in.

(POST) http://localhost:8080/users/register
This lets a new user sign up and stores their information to be retrieved later if they want to login.

(GET) http://localhost:8080/preferences
Once the JWT token has been retrieved by logging in, the user can then request their preferences data to be used in the front-end.

(PUT) http://localhost:8080/preferences/:userId
If the user wants to change any of their data, the can edit their preference data using this route. The :userId is their user id, such as 1.

<!-- Download Instructions -->

To start, open the code in a code editor of your choice.
Then open up your terminal and type
npm install
This will download your node_modules folder so the application can run.

There are still some more things you will need to install from your terminal again.
npm i bcrypt cors dotenv express jsonwebtoken knex mysql2 nodemon uniqid

You will also need to make a .env file and populate it will your information.
There is an example .env.example for you to look at. Please make sure to keep your port on 8080, or it will cause issues when trying to work with the game-site front-end.

Once you have everything installed, then type npm start into your terminal and the server should be hosted on http://localhost:8080.

<!-- Tech Stacks Used -->

Front-end: JavaScript, React, JSX, and SASS.
Back-end: Node.js, Express.js, and MySQL.
