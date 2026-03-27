# Library Management System

A full-stack **Library Management System** built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

This project supports:
- Admin and User login
- Maintenance module
- Reports module
- Transactions module
- Membership management
- Book and movie management
- Issue / Return / Fine flow
- Dummy seed data for testing

---

## Project Overview

This application is designed to manage library operations in a structured way.

### Main modules
- **Authentication**
  - Admin login
  - User login
- **Maintenance**
  - Add Membership
  - Update Membership
  - Add Book / Movie
  - Update Book / Movie
  - User Management
- **Reports**
  - Master list of books
  - Master list of movies
  - Active issues
  - Overdue returns
  - Membership reports
- **Transactions**
  - Book availability
  - Issue book
  - Return book
  - Pay fine

---

## Roles and Access

### Admin
Admin can access:
- Maintenance
- Reports
- Transactions

### User
User can access:
- Reports
- Transactions

User **cannot access**:
- Maintenance

---

## Validation Rules Implemented

The project follows these business rules:

### Book Available
- At least one text field or dropdown must be filled before search
- If nothing is selected, error message is shown on same page
- Search result row contains a selectable radio button

### Book Issue
- Book name is required
- Author name auto-populates and is non-editable
- Issue date cannot be earlier than today
- Return date auto-populates to 15 days ahead
- Return date can be edited earlier, but not later than 15 days
- Remarks are optional
- Invalid submission shows error on page

### Return Book
- Book name is required
- Author name auto-populates and is non-editable
- Serial number is mandatory
- Issue date auto-populates and is non-editable
- Return date auto-populates from issue record
- Return date can be edited earlier or later
- Invalid submission shows error on page
- On confirm, user goes to Pay Fine page even if fine is zero

### Fine Pay
- All fields auto-populated except:
  - Fine Paid checkbox
  - Remarks
- If no fine exists, confirm completes transaction
- If fine is pending, Fine Paid must be checked
- Otherwise return transaction is not completed

### Add Membership
- All fields are mandatory
- One duration option must be selected:
  - 6 months
  - 1 year
  - 2 years
- Default selected option: **6 months**

### Update Membership
- Membership number is mandatory
- Data is populated based on membership number
- User can extend or cancel membership
- Default selected option: **6 months extension**

### Add Book
- One option must be selected:
  - Book
  - Movie
- Default selected option: **Book**
- All fields mandatory
- If details are missing, error shown on same page

### Update Book
- One option must be selected:
  - Book
  - Movie
- Default selected option: **Book**
- All fields mandatory
- If details are missing, error shown on same page

### User Management
- One option must be selected:
  - New User
  - Existing User
- Default selected option: **New User**
- Name is mandatory

---

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- CSS / basic UI styling

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
- dotenv

---

## Folder Structure

```bash
library_management_system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validations/
│   ├── package.json
│   └── .env
│
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── api/
        │   ├── app/
        │   ├── assets/
        │   ├── components/
        │   ├── context/
        │   ├── layouts/
        │   ├── pages/
        │   ├── routes/
        │   └── utils/
        ├── package.json
        └── .env