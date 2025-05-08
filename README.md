# Digi Fasal - Agricultural Marketplace Platform

Digi Fasal is a comprehensive agricultural marketplace platform connecting farmers, buyers, and service providers with a focus on crop listings and commerce functionality.

## Features

- **User Roles**: Support for farmers, buyers, and service providers
- **Product Marketplace**: Browse and search agricultural products by category
- **Service Listings**: Access transportation, equipment rentals, and advisory services
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first approach for all devices

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn UI components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based auth system
- **API**: RESTful API architecture

## Local Setup

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Step 1: Download the Code

**Option 1: Download ZIP**
- In Replit, go to the three-dot menu (...) in the top-left corner
- Select "Download as zip"
- Extract the downloaded ZIP file to your preferred location

**Option 2: Clone via Git**
- Go to the Replit project page
- Copy the Git URL from the Project info panel
- Clone using: `git clone [URL]`

### Step 2: Install Dependencies

Navigate to the project folder and run:

```bash
npm install
```

### Step 3: Set Up the Database

1. Create a PostgreSQL database
2. Configure environment variables:

Create a `.env` file in the root directory with the following:

```
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```

3. Run database migrations:

```bash
npm run db:push
```

### Step 4: Seed Initial Data (Optional)

To populate your database with sample data:

1. Start the server
2. Make a POST request to `/api/seed` endpoint:

```bash
curl -X POST http://localhost:5000/api/seed
```

### Step 5: Start the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

- `/client`: Frontend React application
  - `/src`: Source files
    - `/components`: UI components
    - `/pages`: Page components
    - `/hooks`: Custom React hooks
    - `/lib`: Utility functions
    - `/types`: TypeScript type definitions
- `/server`: Backend Express server
  - `routes.ts`: API endpoints
  - `storage.ts`: Data access layer
  - `db.ts`: Database connection
- `/shared`: Common code between frontend and backend
  - `schema.ts`: Data models and schemas

## Deployment

For production deployment:

1. Build the frontend:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## License

[MIT](LICENSE)

<!--
setting up neon database url in .evn file 
npx drizzle-kit generate 
npx drizzle-kit push


-->
