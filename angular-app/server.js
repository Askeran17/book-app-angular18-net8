const express = require('express');
const path = require('path');
const compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || 'https://net8-api-d3f72ab7e8a4.herokuapp.com';
const NODE_ENV = process.env.NODE_ENV || 'development';

if (!process.env.API_URL) {
  console.warn('⚠️  API_URL is not defined in .env');
}

app.use(express.json());
app.use(compression());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}));

app.use(express.static(path.join(__dirname, 'dist/angular-app/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-app/browser/index.html'));
});

http.createServer(app).listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🔗 API_URL: ${API_URL}`);
});

