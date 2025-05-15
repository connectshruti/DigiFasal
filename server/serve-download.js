/**
 * Simple HTTP server to serve the download package
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const PACKAGE_PATH = path.join(__dirname, 'digi-fasal-project.tar.gz');
const FILE_NAME = 'digi-fasal-project.tar.gz';

if (!fs.existsSync(PACKAGE_PATH)) {
  console.error('Package file not found! Make sure to run create-download-package.sh first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  
  if (req.url === '/download') {
    console.log('Serving download file...');
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${FILE_NAME}`);
    res.setHeader('Content-Type', 'application/gzip');
    
    // Get file size for Content-Length header
    const stats = fs.statSync(PACKAGE_PATH);
    res.setHeader('Content-Length', stats.size);
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(PACKAGE_PATH);
    fileStream.pipe(res);
    
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  } else {
    // Simple download page
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Digi Fasal - Download</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            margin-top: 40px;
            text-align: center;
          }
          h1 {
            color: #2E7D32;
          }
          .download-btn {
            display: inline-block;
            background-color: #2E7D32;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s;
          }
          .download-btn:hover {
            background-color: #1B5E20;
          }
          .info {
            margin-top: 30px;
            text-align: left;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Digi Fasal Agricultural Marketplace</h1>
          <p>Download the complete project code for local installation</p>
          <a href="/download" class="download-btn">Download Project (${(fs.statSync(PACKAGE_PATH).size / (1024 * 1024)).toFixed(2)} MB)</a>
          
          <div class="info">
            <h2>Package Contents:</h2>
            <ul>
              <li>Complete source code (frontend and backend)</li>
              <li>Database schema and models</li>
              <li>Setup scripts and documentation</li>
              <li>Deployment instructions</li>
            </ul>
            
            <h2>System Requirements:</h2>
            <ul>
              <li>Node.js v18 or higher</li>
              <li>npm (comes with Node.js)</li>
              <li>PostgreSQL database</li>
            </ul>
            
            <p>For detailed installation instructions, please refer to the DOWNLOAD_INSTRUCTIONS.md file included in the package.</p>
          </div>
        </div>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Download server running at ${process.env.SERVER_URL}${PORT}`);
  console.log(`Download URL: ${process.env.SERVER_URL}${PORT}/download`);
});