# Digi Fasal - Local Development Guide

This guide is intended for developers who want to contribute to or modify the Digi Fasal platform.

## Development Environment Setup

Follow the basic setup instructions in `DOWNLOAD_INSTRUCTIONS.md` first, then continue with these developer-specific instructions.

### Code Editor Setup

We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Setting Up for Development

1. Install development dependencies:
```bash
npm install
```

2. Create a `.env.development` file in the project root with these settings:
```
DATABASE_URL=postgresql://username:password@localhost:5432/digi_fasal
NODE_ENV=development
```

## Project Structure Details

### Frontend Architecture

The frontend follows a component-based architecture using React and is styled with Tailwind CSS.

#### Key Frontend Files and Directories:

- `client/src/App.tsx`: Main application component with routing setup
- `client/src/pages/`: Page components for different routes
- `client/src/components/`: Reusable UI components
- `client/src/hooks/`: Custom React hooks for shared functionality
- `client/src/lib/`: Utility functions and shared logic
- `client/src/types/`: TypeScript type definitions

#### State Management:

- React Context API for global state (user authentication, cart)
- React Query for server state and API calls

### Backend Architecture

The backend is built with Express.js and uses a PostgreSQL database with Drizzle ORM.

#### Key Backend Files and Directories:

- `server/index.ts`: Server entry point and middleware setup
- `server/routes.ts`: API route definitions and handlers
- `server/storage.ts`: Data access layer implementing the storage interface
- `server/db.ts`: Database connection and Drizzle ORM setup

#### Database Schema:

- `shared/schema.ts`: Database schema definitions, types, and relations

## Development Workflow

### Running in Development Mode

Start the development server:
```bash
npm run dev
```

The server will restart automatically when you make changes to the code.

### Database Migrations

When you change the database schema in `shared/schema.ts`, you need to push those changes to the database:

```bash
npm run db:push
```

### Adding New Features

1. **Frontend Components**: Add new components in `client/src/components/`
2. **Pages**: Add new pages in `client/src/pages/` and update routing in `App.tsx`
3. **API Endpoints**: Add new routes in `server/routes.ts`
4. **Database Models**: Update schema in `shared/schema.ts` and implement storage methods in `server/storage.ts`

### Testing Changes

For now, testing is done manually by:
1. Running the application
2. Using the UI to verify functionality
3. Using tools like cURL or Postman to test API endpoints directly

## Deployment Considerations

### Building for Production

```bash
npm run build
```

This creates optimized production builds in the `dist/` directory.

### Running in Production Mode

```bash
npm start
```

For production deployments, consider:
- Using environment variables for configuration
- Setting up a proper PostgreSQL database with backups
- Using a process manager like PM2
- Setting up a reverse proxy with Nginx or similar

## Common Development Tasks

### Adding a New API Endpoint

1. Define the endpoint in `server/routes.ts`
2. Implement any necessary storage methods in `server/storage.ts`
3. Create frontend components to interact with the new endpoint

### Creating a New Page

1. Create a new page component in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Link to the new page from navigation components

### Adding a New Database Model

1. Define the model in `shared/schema.ts`
2. Set up relations with existing models
3. Create insert/select types
4. Implement storage methods in `server/storage.ts`
5. Push the schema changes to the database with `npm run db:push`

## Code Style and Best Practices

- Follow TypeScript best practices for type safety
- Use React hooks for component logic
- Write clean, maintainable code with proper comments
- Use async/await for asynchronous operations
- Keep components small and focused on a single responsibility
- Use Tailwind CSS for styling

## Performance Considerations

- Use React Query's caching for API data
- Optimize database queries with proper indexing
- Implement pagination for large data sets
- Use React.memo and useMemo for expensive computations
- Lazy load components and routes when possible

## Security Best Practices

- Validate user input on both client and server
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Never expose sensitive information in client-side code
- Sanitize user-generated content before displaying