# Docker Setup

This project includes Docker configuration for both development and production environments.

## Quick Start

### Development
```bash
# Start development environment with hot reload
npm run docker:dev

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

### Production
```bash
# Start production environment
npm run docker:prod

# Or manually
docker-compose up --build
```

Your app will be available at http://localhost:3001

## Available Commands

- `npm run docker:build` - Build production Docker image
- `npm run docker:run` - Run production container
- `npm run docker:dev` - Start development environment
- `npm run docker:prod` - Start production environment
- `npm run docker:stop` - Stop all containers

## Files Overview

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development build with hot reload
- `docker-compose.yml` - Production environment
- `docker-compose.dev.yml` - Development environment
- `.dockerignore` - Files to exclude from Docker context

## Environment Variables

Make sure to set up your `.env` file with the required environment variables. The Docker containers will automatically load these variables.

## Database Integration

If you're using MongoDB, uncomment the MongoDB service in the docker-compose files and update your connection strings to use the container name as hostname:

```
MONGODB_URI=mongodb://admin:password@mongodb:27017/your-database?authSource=admin
```

Note: MongoDB will be accessible on host port 27018 to avoid conflicts with existing services.

## Production Deployment

The production Dockerfile uses Next.js standalone output for optimal performance and smaller image size. The image includes:

- Multi-stage build for smaller final image
- Non-root user for security
- Optimized layer caching
- Static file serving

## Troubleshooting

### Port Already in Use
The configuration uses port 3001 to avoid conflicts with existing services. If this port is also in use, modify the port mapping in docker-compose files:
```yaml
ports:
  - "3002:3000"  # Use port 3002 instead
```

### Permission Issues
If you encounter permission issues, ensure your user has Docker permissions:
```bash
sudo usermod -aG docker $USER
```

### Build Issues
Clear Docker cache if builds fail:
```bash
docker system prune -a
```