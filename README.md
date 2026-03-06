Natural Language MongoDB Query System
Project Overview

This project allows users to search MongoDB data using natural language queries instead of writing complex database queries.

Users can type simple queries such as:
"Show transactions above 5000"
"Amount between 5000 and 6000"
"Transactions greater than 10000"

The system converts the natural language input into MongoDB queries and returns matching data.

Technologies Used
Node.js – Backend server
Express.js – API framework
MongoDB – Database
Mongoose – MongoDB object modeling
JavaScript – Backend logic
HTML/CSS – Frontend interface

nl-mongo-backend
│
├── client/           # Frontend files
├── models/           # MongoDB schemas
├── routes/           # API routes
├── src/              # Backend logic
├── screen-shots/     # Project screenshots
├── package.json      # Project dependencies
└── README.md         # Project documentation

Installation

1 Clone the Repository
git clone https://github.com/Ithemsettimythri/nl-mongo-backend.git

2 Navigate to the project folder
cd nl-mongo-backend

3 Install Dependencies
npm install

4 Start the Server
npm start

Server will run on:
http://localhost:5000

Example Query

Input in search box:
amount between 5000 and 6000

Output:
All transactions with amount between 5000 and 6000 will be displayed.

Screenshots
Screenshots of the application are available in the screen-shots folder.
