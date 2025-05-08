#!/bin/bash

# Digi Fasal Download Package Creator
# This script creates a downloadable package of the Digi Fasal project

echo "=== Creating Digi Fasal Download Package ==="
echo ""

# Create a temporary directory
TEMP_DIR="digi-fasal-package"
mkdir -p $TEMP_DIR

# Copy all project files, excluding node_modules, .git, and other unnecessary files
echo "Copying project files..."
cp -r client server shared $TEMP_DIR
cp package.json tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js components.json drizzle.config.ts $TEMP_DIR
cp README.md DOWNLOAD_INSTRUCTIONS.md LOCAL_DEVELOPMENT.md DEPLOYMENT.md $TEMP_DIR
cp setup.js seed-database.js $TEMP_DIR

# Create a placeholder .env file with instructions
cat > $TEMP_DIR/.env.example << EOL
# Digi Fasal Environment Configuration
# Rename this file to .env and fill in your values

# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/digi_fasal

# Node environment
NODE_ENV=development
EOL

# Create a TAR archive
echo "Creating TAR archive..."
tar -czf digi-fasal-project.tar.gz $TEMP_DIR

# Clean up
echo "Cleaning up temporary files..."
rm -rf $TEMP_DIR

echo ""
echo "=== Package Created Successfully ==="
echo "Your download package is ready: digi-fasal-project.tar.gz"
echo ""
echo "This package contains:"
echo "- All source code (client, server, shared)"
echo "- Configuration files"
echo "- Setup and seed scripts"
echo "- Documentation files"
echo ""
echo "See DOWNLOAD_INSTRUCTIONS.md for setup instructions."