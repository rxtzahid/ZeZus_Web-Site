const http = require('http');
const app = require('./src/app');
const initializeSocket = require('./src/config/socket');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Make io accessible to routes
app.set('io', io);

server.listen(PORT, () => {
  console.log(`\n┌─────────────────────────────────────┐`);
  console.log(`│  Assa Pathao Backend Server         │`);
  console.log(`│  Server running on port ${PORT}       │`);
  console.log(`│  Environment: ${process.env.NODE_ENV || 'development'} │`);
  console.log(`└─────────────────────────────────────┘\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
