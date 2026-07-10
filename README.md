## Demo Session Toolkit

***Instantly isolate each visitor's session on your demo — no login required, no data collisions, no cleanup hassle.***

This project toolkit will provide you with a set of code and libraries so that every visitor can interact with an online demo of your web project, without their experience being disrupted by changes made by other visitors, and without needing to create an account to test your programme.

## Principle

- The frontend must store a session ID locally for every new visitor. It will send this back in each of its backend requests via an "X-Session-ID" header.

-  The backend sends this session ID to the database, which then transparently filters each request to return only the data specific to that session.

- Finally, a cron job will periodically delete old entries from the database to save storage space.

 Each front and back section has specific instructions to follow. I’ve tried to keep things as simple as possible, but you’ll still need to make a few minor changes to your project’s code; simply importing it won’t be enough. But it shouldn’t be too much trouble.

 ## Frontend

 - [JavaScript](link)
 
 ## Backend
 
 - [Express / PostGreSQL](link)

 ## RDBMS

 - [PostGreSQL](link)