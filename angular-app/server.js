const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');
const http = require('http');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(compression());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/angular-app')));

// Proxy API requests to .NET Core server
app.use('/api', createProxyMiddleware({
  target: process.env.API_URL || 'https://net8-api-d3f72ab7e8a4.herokuapp.com',
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});

// Start the app by listening on the default port
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`ASPNETCORE_ENVIRONMENT: ${process.env.ASPNETCORE_ENVIRONMENT}`);
});
