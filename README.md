# MERN Stack Company Management System

This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to create, manage, and search for companies, with two distinct roles: **Admin** and **User**.

## Features

### User Features:
- **Register/Login**: Users can sign up and log in using their credentials.
- **Create Company**: Authenticated users can create new companies, providing details like company name and address.
- **View Own Companies**: Users can view a list of companies they've created, along with approval status (approved or pending).
- **Search Companies**: Users can search companies by company name or creator (login ID).

### Admin Features:
- **View All Companies**: Admins can view a list of all companies created by any user.
- **Approve Companies**: Admins can approve or reject company creation requests.
- **Edit/Delete Companies**: Admins can edit or delete any company.
- **Add Companies**: Admins can add new companies, with approval status set to **Approved** by default.
- **Search by Company Name or Creator**: Admins can search companies by name or creator's login ID (email).

## Installation and Setup

### Prerequisites

- Node.js (v12.x )
- MongoDB (local )


Usage

1. Register and Login
Users and admins can register via the signup form.
Once logged in, users and admins will be redirected to their respective dashboards.
2. Admin Dashboard
The admin dashboard displays all companies with options to approve, edit, and delete companies.
Admins can also search companies by company name or creator's login ID.
3. User Dashboard
Users can create new companies and view a list of their own companies.
The dashboard shows the approval status of each company (approved/pending).
Users can search their companies by company name or creator's login ID.


Technologies Used
Frontend: React.js, Axios, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for ORM)
Authentication: JSON Web Tokens (JWT)
State Management: React Hooks (useState, useEffect)


API Endpoints
User Endpoints
POST /api/auth/register: Register a new user
POST /api/auth/login: Login an existing user
GET /api/user/companies: Get companies created by the logged-in user
POST /api/user/companies: Create a new company

Admin Endpoints
GET /api/admin/companies: Get all companies
POST /api/admin/companies: Add a new company (default approved)
PUT /api/admin/companies/:id: Edit a company by ID
DELETE /api/admin/companies/:id: Delete a company by ID
POST /api/admin/companies/:id/approve: Approve a company by ID
GET /api/admin/companies/search: Search companies by name or created_by


project/
│
├── client/           # React Frontend
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/           # Node.js Backend
│   ├── config/       # Configuration files
│   ├── controllers/  # Business logic for routes
│   ├── middleware/   # JWT auth and error handling
│   ├── models/       # Mongoose models (User, Company)
│   ├── routes/       # Express routes (user, admin,auth)
│   ├── server.js     # Entry point for the backend
│   └── package.json  # Server dependencies
│
└── README.md

### Key Sections:
- **Features**: Highlights both admin and user functionalities.
- **Installation**: Provides steps to install and run the project locally.
- **Usage**: Describes how to navigate the project for both roles (admin and user).
- **Technologies Used**: Lists the tools and frameworks employed.
- **API Endpoints**: Summarizes available backend endpoints for both user and admin functionalities.
- **Folder Structure**: Displays how the project is organized.
- **Future Improvements**: Suggestions for extending the project in the future.
   
