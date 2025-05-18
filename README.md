# Finance Tracker App

A full-stack personal finance management application built using React.js and Node.js. Designed to help users track income, expenses, and manage their financial data efficiently.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Developer Notes](#developer-notes)
- [Future Improvements](#future-improvements)

---

## 📖 Overview

The Finance Tracker App was developed as part of a coding interview challenge. It aims to provide users with a platform to manage their finances by tracking income and expenses, offering insights into their financial habits.

---

## ✅ Features

- **User Authentication**: Secure registration and login system.
- **Transaction Management**: Add, edit, and delete income and expense records.
- **Financial Dashboard**: View summaries of total income, expenses, and balance.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Data Visualization**: Charts and graphs to visualize financial data.
- **API Integration**: Backend API to handle data operations.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest
- **Styling**: CSS, Bootstrap

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js version 16.x or higher

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```


3. Build the project:

   ```bash
   npm run build
   ```


4. Start the development server:

   ```bash
   npm start
   ```


### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```


3. Build the project:

   ```bash
   npm run build
   ```


4. Seed the database:

   ```bash
   npm run seed
   ```


5. Run tests:

   ```bash
   npm run coverage
   ```


6. Start the server:

   ```bash
   npm start
   ```


---

## 🚀 Usage

- Access the frontend at `http://localhost:3000`.
- Use the backend API for data operations.
- Refer to the `FinanceTrackerApp.postman_collection.json` file for API endpoints and testing.

---

## 🧪 Testing

The backend includes unit tests to ensure functionality. Run the following command to execute tests and generate a coverage report:


```bash
npm run coverage
```


The coverage report can be viewed at `backend/coverage/index.html`.

---

## 📝 Developer Notes

As a backend developer, I focused on building a robust backend system. The database schema was designed using SQLite for its simplicity and portability. The backend was developed with Node.js and Express.js, ensuring secure authentication with JWT.

The frontend was developed using React.js, with components for user registration, login, and the financial dashboard. While the integration between frontend and backend is incomplete, the foundational work is in place.

---

## 🚧 Future Improvements

- **Frontend Integration**: Complete the integration between frontend and backend.
- **UI Enhancement**: Implement a modern UI using component libraries like [Next UI](https://nextui.org/docs/guide/installation).
- **Testing**: Add unit tests for frontend components using Jest and React Testing Library.
- **Code Refactoring**: Improve code readability and maintainability.
- **Additional Features**:
  - Implement budgeting functionality.
  - Add data export/import capabilities.
  - Enhance data visualization with charts and graphs.
