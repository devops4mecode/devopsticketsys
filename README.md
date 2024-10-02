# DevOps Ticketing System

This is a simple web-based ticketing system built with Node.js, Express, and SQLite. It allows users to create, view, and manage tickets.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Open your browser and go to `http://localhost:3000`

## Endpoints

- `POST /api/tickets`: Create a new ticket



## Project Folder/Structure

DevOpsTicketingSystem/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── dashboard.js
│   ├── ticket-management.js
│   ├── search-filter.js
│   ├── comments.js
│   └── assets/
│       ├── images/
│       └── uploads/
│
├── routes/
│   ├── tickets.js
│   ├── users.js
│   └── comments.js
│
├── models/
│   ├── ticket.js
│   ├── user.js
│   └── comment.js
│
├── views/
│   ├── dashboard.ejs
│   ├── ticket.ejs
│   └── layout.ejs
│
├── config/
│   ├── database.js
│   └── auth.js
│
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── README.md
├── package.json
└── server.js


## Folder Structure Validation

config/ Directory:

auth.js: Handles authentication logic, such as generating and verifying JWTs.
database.js: Contains the Sequelize configuration for connecting to the SQLite database.
models/ Directory:

comment.js: Defines the Sequelize model for comments.
ticket.js: Defines the Sequelize model for tickets.
user.js: Defines the Sequelize model for users.
public/ Directory:

assets/: A subdirectory, likely intended for storing images or other assets, although it appears empty.
app.js: Handles the main front-end logic, such as creating tickets.
comments.js: Manages the front-end logic related to comments.
dashboard.js: Handles the front-end logic for displaying the dashboard.
index.html: The main HTML file that serves the UI.
search-filter.js: Manages search and filtering on the front-end.
styles.css: Contains CSS styles for the application.
ticket-management.js: Handles ticket management tasks on the front-end.
routes/ Directory:

comments.js: API routes related to comments.
tickets.js: API routes related to ticket operations (creation, update, deletion, etc.).
users.js: API routes related to user operations like login and registration.
Root Directory Files:

.env: Likely contains environment variables (e.g., JWT secret, database configurations).
.gitignore: Specifies which files and directories Git should ignore (e.g., node_modules/, database.sqlite, etc.).
database.sqlite: The SQLite database file.
docker-compose.yml: Docker Compose file to define services, if you are containerizing your application.
Dockerfile: Dockerfile to create a Docker image of your application.
package-lock.json: Automatically generated by npm, locks the versions of the dependencies.
package.json: Contains metadata about your project and its dependencies.
README.md: A markdown file usually containing documentation or instructions about your project.
server.js: The main server file where the Express app is defined and routes are connected.