# Grievance Redressal System

A MERN Stack web application designed to manage student and faculty grievances with secure login/signup using JWT tokens. The system provides dashboards for users to submit and track grievances and for admins to update statuses, add remarks, filter grievances, and generate reports.

## Features

- **User Dashboards**: 
  - Submit and track grievances.
- **Admin Dashboards**: 
  - Update grievance statuses.
  - Add remarks to grievances.
  - Filter grievances based on various criteria.
  - Generate reports.
- **Authentication**: 
  - Secure login/signup using JWT tokens.

## Tech Stack

- **Frontend**: React (located in `client` folder)
- **Backend**: Node.js, Express.js (located in `server` folder)
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: [Render](https://render.com)

## Demo

Check out the live application here: [Grievance Redressal System](https://grievance-redressal-system-vfft.onrender.com/)

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB (local or Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/aashiyatanwar/grievance-redressal-system.git
   cd grievance-redressal-system

2. Backend Setup:

    - Navigate to the root directory
    - Create .env file
       ```bash
       DB_STRING = your-connection-string
       TOKEN_KEY = your-token-key
       TOKEN_KEY_FAC = yir-token-key-fac
       JWT_SECRET=your_secret_key_here
    - Run : npm i && npm run dev

3. Frontend Setup:
    - Navigate to the client directory : cd client
    - Run : npm i && npm start