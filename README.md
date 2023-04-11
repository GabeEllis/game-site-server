Thank you for checking out Game Site server.

To start, open the code in a code editor of your choice.
Then open up your terminal and type
npm install
This will download your node_modules folder so the application can run.

There are still some more things you will need to install from your terminal again.
npm i bcrypt cors dotenv express jsonwebtoken knex mysql2 nodemon uniqid

You will also need to make a .env file and populate it will your information.
There is an example .env.example for you to look at. Please make sure to keep your port on 8080, or it will cause issues when trying to work with the game-site front-end.

Once you have everything installed, then type npm start into your terminal and the server should be hosted on http://localhost:8080.
