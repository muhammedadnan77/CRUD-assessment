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


### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/mern-company-management.git
   cd mern-company-management

   
