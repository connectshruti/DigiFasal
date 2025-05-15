#!/usr/bin/env node

/**
 * Digi Fasal Database Seeding Script
 * 
 * This script seeds the local database with initial data for testing and development.
 * It populates users, products, services, and testimonials tables.
 * 
 * Usage: node seed-database.js
 */

// For Node.js <18
let fetch;
try {
  fetch = require('node-fetch');
} catch (e) {
  // For Node.js >=18 with built-in fetch
  if (!globalThis.fetch) {
    console.log("Using Node.js 18+ with native fetch support");
    fetch = globalThis.fetch;
  }
}

async function seedDatabase() {
  console.log('\n=== Digi Fasal Database Seeder ===\n');
  console.log('This script will populate your database with sample data.\n');
  
  try {
    console.log('Checking if server is running...');
    
    try {
      // Check if server is running
      await fetch(`${process.env.SERVER_URL}/api/products`);
      console.log('Server is running. Proceeding with database seeding...\n');
    } catch (error) {
      console.error('Error: Server is not running. Please start the server with "npm run dev" first.');
      process.exit(1);
    }
    
    console.log('Seeding database...');
    
    const response = await fetch(`${process.env.SERVER_URL}/api/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ Database seeded successfully!');
      console.log('\nSeeded data includes:');
      console.log('- 3 farmer accounts');
      console.log('- 1 service provider account');
      console.log('- 4 agricultural products');
      console.log('- 1 transportation service');
      console.log('- 2 testimonials');
      
      console.log(`\nYou can now browse the application at ${process.env.SERVER_URL}`);
    } else {
      const errorData = await response.json();
      console.error('Error seeding database:', errorData.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.error('\nMake sure:');
    console.error(`1. The server is running at ${process.env.SERVER_URL}`);
    console.error('2. Your database connection is properly configured in .env');
    console.error('3. Database migrations have been applied with "npm run db:push"');
  }
}

seedDatabase();