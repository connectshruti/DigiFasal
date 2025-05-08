# Digi Fasal - Deployment Guide

This guide provides instructions for deploying the Digi Fasal agricultural marketplace platform to various hosting environments.

## Preparing for Deployment

Before deploying, ensure you have:

1. A complete and tested application
2. A PostgreSQL database service
3. Node.js hosting environment
4. Environment variables configured

## Building the Application

To create a production build:

```bash
npm run build
```

This command:
- Builds the React frontend with Vite
- Compiles the TypeScript server code with esbuild
- Creates optimized files in the `dist/` directory

## Environment Variables

For production deployment, you'll need these environment variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
```

## Deployment Options

### Option 1: Traditional Hosting

#### Prerequisites:
- A VPS or dedicated server with Node.js 18+ installed
- PostgreSQL database
- Nginx or Apache (optional, for reverse proxy)

#### Steps:

1. Transfer the built application to your server:
   ```bash
   scp -r dist/ user@your-server:/path/to/app
   ```

2. Install production dependencies:
   ```bash
   npm install --production
   ```

3. Set up environment variables on your server.

4. Start the application:
   ```bash
   npm start
   ```

5. (Recommended) Set up a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name digi-fasal
   ```

6. Configure a reverse proxy with Nginx:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Platform as a Service (PaaS)

#### Deploy to Heroku:

1. Create a `Procfile` in your project root:
   ```
   web: npm start
   ```

2. Initialize a Git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a Heroku app:
   ```bash
   heroku create digi-fasal
   ```

4. Add a PostgreSQL database:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. Deploy the application:
   ```bash
   git push heroku main
   ```

#### Deploy to Railway or Render:

These platforms offer similar deployment experiences with easy PostgreSQL integration.

1. Connect your Git repository
2. Configure the build command: `npm run build`
3. Configure the start command: `npm start`
4. Add environment variables
5. Deploy

### Option 3: Docker Deployment

1. Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist/ ./dist/

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]
```

2. Build the Docker image:
```bash
docker build -t digi-fasal .
```

3. Run the container:
```bash
docker run -p 5000:5000 --env-file .env digi-fasal
```

## Database Migration in Production

Before deploying a new version with schema changes:

1. Backup your production database
2. Run migrations in a staging environment first
3. Apply migrations to production using:
   ```bash
   NODE_ENV=production npm run db:push
   ```

## SSL Configuration

For secure HTTPS connections:

1. Obtain SSL certificates (Let's Encrypt recommended)
2. Configure your reverse proxy to use SSL

With Nginx:
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    # SSL configuration options...

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Production Maintenance

### Monitoring

Monitor your application with:
- PM2 monitoring
- Server monitoring tools (e.g., Datadog, New Relic)
- Log management (e.g., ELK stack)

### Backups

Regularly backup your PostgreSQL database:

```bash
pg_dump -U postgres -d digi_fasal > backup_$(date +%Y%m%d).sql
```

### Updates and Rollbacks

To update your production deployment:

1. Pull the latest changes
2. Build the application
3. Restart the service

For rollbacks:
1. Identify the last working version
2. Deploy that version
3. Restore database if necessary

## Scaling Considerations

As your application grows:

- Consider using a load balancer
- Set up database replication
- Implement caching strategies
- Use content delivery networks (CDNs) for static assets
- Consider containerization and orchestration (Kubernetes)

## Security Best Practices

- Keep all dependencies updated
- Implement rate limiting
- Set up Web Application Firewall (WAF)
- Use secure HTTP headers
- Perform regular security audits
- Enable database encryption
- Set up proper user authentication and authorization