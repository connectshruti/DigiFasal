#!/usr/bin/env node

/**
 * Digi Fasal Setup Script
 * 
 * This script helps set up the Digi Fasal project on your local environment.
 * It checks for required dependencies, creates a .env file, and provides
 * guidance on setting up the database.
 * 
 * Usage: node setup.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Digi Fasal Setup ===\n');
console.log('This script will help you set up the Digi Fasal project locally.\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);

if (majorVersion < 18) {
  console.warn('\nWARNING: Recommended Node.js version is 18 or higher. You might encounter issues with your current version.\n');
}

// Check if npm packages are installed
console.log('\nChecking dependencies...');
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error('Failed to install dependencies. Please run "npm install" manually.');
  }
} else {
  console.log('Dependencies already installed.');
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('\nCreating .env file...');
  
  rl.question('Enter your PostgreSQL username (default: postgres): ', (username) => {
    username = username || 'postgres';
    
    rl.question('Enter your PostgreSQL password: ', (password) => {
      rl.question('Enter your PostgreSQL host (default: localhost): ', (host) => {
        host = host || 'localhost';
        
        rl.question('Enter your PostgreSQL port (default: 5432): ', (port) => {
          port = port || '5432';
          
          rl.question('Enter your database name (default: digi_fasal): ', (dbName) => {
            dbName = dbName || 'digi_fasal';
            
            const envContent = `DATABASE_URL=postgresql://${username}:${password}@${host}:${port}/${dbName}`;
            fs.writeFileSync(envPath, envContent);
            console.log('.env file created successfully.');
            
            console.log('\n=== Next Steps ===');
            console.log('1. Ensure your PostgreSQL database is running');
            console.log(`2. Create a database named "${dbName}" if it doesn't exist`);
            console.log('3. Run "npm run db:push" to set up the database schema');
            console.log('4. Run "npm run dev" to start the development server');
            console.log(`\nYour Digi Fasal application will be available at ${process.env.SERVER_URL}`);
            
            rl.close();
          });
        });
      });
    });
  });
} else {
  console.log('\n.env file already exists.');
  console.log('\n=== Next Steps ===');
  console.log('1. Ensure your PostgreSQL database is running');
  console.log('2. Run "npm run db:push" to set up the database schema');
  console.log('3. Run "npm run dev" to start the development server');
  console.log(`\nYour Digi Fasal application will be available at ${process.env.SERVER_URL}`);
  rl.close();
}