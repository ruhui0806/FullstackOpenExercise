28.05.2023: working on part13_a

Difference between text and string data types in Sequelize:

The postgres fly.app name is: fs-blog-app. You should use this name to start the application.

# To connect to the database:

    fly postgres connect -a fs-blog-app

# To Start the application:

<li> Local Connect to the database first:

    flyctl proxy 5432 -a fs-blog-app

<li> While keeping the connection running, open another terminal and run the application:

    node index.js

Or:

    npm run dev

A string field has a limit of 255 characters, whereas a text field has a character limit of 30,000 characters

To read:
https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
