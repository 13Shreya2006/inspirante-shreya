# College Event Registration Portal

A full-stack web application that allows administrators to manage college events and students to register for them.

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Authentication

* JWT (JSON Web Token)

---

## Features

### Admin

* Login as admin
* Create events
* View all events
* View event registrations
* View capacity fill percentage with color coding

### Student

* Login as student
* View upcoming events
* Register for events
* View personal registrations
* Duplicate registrations prevented

---

## Setup Instructions

### Clone Repository

git clone https://github.com/13Shreya2006/inspirante-shreya.git
cd inspirante-shreya


### Install Backend Dependencies

cd Backend
npm install


### Configure Database

Create a MySQL database named:


college_event_portal


Import:

database.sql

### Environment Variables

Create a .env file inside Backend and configure:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_event_portal
JWT_SECRET=your_secret_key

### Run Backend


cd Backend
node server.js


Server runs on:


http://localhost:3000


### Run Frontend

Open:


Frontend/login.html


in your browser.


## Sample Credentials

### Admin

Username:
admin

Password:
inspirante2026


### Student

Username:

asha.rao

Password:

student123


---

## Database Seed

The file `database.sql` contains:

* Tables
* Sample users
* Sample events

Import it before running the application.

---

## API Endpoints

### Authentication

POST /api/login

### Events

GET /api/events

POST /api/events

### Registrations

POST /api/register

GET /api/my-registrations/:studentId

## Known Limitations

* No deployment included
* Passwords are stored as plain text for assignment simplicity
* UI is intentionally simple and functional
