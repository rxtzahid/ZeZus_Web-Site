const socketIO = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // Store connected users
  const users = {};
  const drivers = {};

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // User joins
    socket.on('user-join', (userId) => {
      users[userId] = socket.id;
      console.log('User joined:', userId);
    });

    // Driver joins
    socket.on('driver-join', (driverId) => {
      drivers[driverId] = socket.id;
      console.log('Driver joined:', driverId);
      io.emit('driver-online', { driverId, status: 'online' });
    });

    // Real-time location update
    socket.on('location-update', (data) => {
      const { userId, driverId, location } = data;
      io.emit('location-update', { userId, driverId, location });
    });

    // Ride request
    socket.on('ride-request', (data) => {
      io.emit('ride-request', data);
    });

    // Ride acceptance
    socket.on('ride-accepted', (data) => {
      const userSocket = users[data.userId];
      if (userSocket) {
        io.to(userSocket).emit('ride-accepted', data);
      }
    });

    // Ride cancellation
    socket.on('ride-cancelled', (data) => {
      io.emit('ride-cancelled', data);
    });

    // Disconnect
    socket.on('disconnect', () => {
      delete users[Object.keys(users).find(key => users[key] === socket.id)];
      delete drivers[Object.keys(drivers).find(key => drivers[key] === socket.id)];
      console.log('Client disconnected:', socket.id);
      io.emit('driver-offline', { status: 'offline' });
    });
  });

  return io;
};

module.exports = initializeSocket;
