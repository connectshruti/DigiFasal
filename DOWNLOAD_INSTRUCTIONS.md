# Digi Fasal - Download & Setup Instructions

This document provides comprehensive instructions for downloading, setting up, and running the Digi Fasal agricultural marketplace platform on your local machine.

## Download Options

### Option 1: Download from Replit (Recommended)

1. In your Replit project view, find the three-dot menu (...) in the top-left corner
2. Select "Download as zip"
3. Save the ZIP file to your preferred location on your computer
4. Extract the ZIP file to create a folder containing all project files

### Option 2: Clone via Git (For Developers)

If you have Git installed and prefer to use version control:

1. Open a terminal or command prompt
2. Navigate to the directory where you want to store the project
3. Run this command (replace with your actual Replit repository URL):
   ```
   git clone https://github.com/yourusername/digi-fasal.git
   ```

## Local Setup Instructions

### Prerequisites

- Node.js version 18 or higher
- npm (comes with Node.js)
- PostgreSQL database

### Step 1: Install Node.js and npm

If you don't already have Node.js installed:

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download and install the LTS (Long Term Support) version
3. Verify installation by opening a terminal/command prompt and typing:
   ```
   node --version
   npm --version
   ```

### Step 2: Install PostgreSQL

1. Download PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Follow the installation instructions for your operating system
3. During installation, note your:
   - PostgreSQL username (default is usually "postgres")
   - Password
   - Port (default is 5432)

### Step 3: Set Up the Project

1. Open a terminal/command prompt
2. Navigate to the extracted project folder
3. Run the setup script:
   ```
   node setup.js
   ```
   or
   ```
   ./setup.js
   ```

   This script will:
   - Check your Node.js version
   - Install all project dependencies
   - Create a .env file with your database connection details
   - Guide you through next steps

### Step 4: Create and Configure the Database

1. Open pgAdmin or your preferred PostgreSQL management tool
2. Create a new database (default name: "digi_fasal")
3. Run the database migration command to create all required tables:
   ```
   npm run db:push
   ```

### Step 5: Seed the Database with Sample Data

1. Start the development server:
   ```
   npm run dev
   ```
2. In a new terminal/command prompt, navigate to the project folder and run:
   ```
   node seed-database.js
   ```
   or
   ```
   ./seed-database.js
   ```

### Step 6: Access the Application

1. Open your web browser
2. Navigate to [http://localhost:5000](http://localhost:5000)
3. You should see the Digi Fasal application running locally

## Project Structure Overview

```
digi-fasal/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript type definitions
├── server/              # Backend Express server
│   ├── db.ts            # Database connection
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Data access layer
│   └── vite.ts          # Vite configuration
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Database schema and types
├── setup.js             # Setup script for local environment
├── seed-database.js     # Database seeding script
├── README.md            # Project documentation
└── package.json         # Project dependencies and scripts
```

## Troubleshooting

### Database Connection Issues

- Verify your PostgreSQL service is running
- Check your database credentials in the .env file
- Ensure you have created the database specified in your .env file

### Server Won't Start

- Check for error messages in the terminal
- Verify that port 5000 is not in use by another application
- Ensure all dependencies are installed with `npm install`

### Client-Side Issues

- Clear your browser cache
- Check the browser console for error messages
- Verify that the server is running and accessible

## Additional Resources

- PostgreSQL Documentation: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- Node.js Documentation: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- React Documentation: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- Express Documentation: [https://expressjs.com/](https://expressjs.com/)