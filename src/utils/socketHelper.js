// Socket helper functions
const notifyUser = (io, userId, eventName, data) => {
  io.emit(`user-${userId}-${eventName}`, data);
};

const notifyDriver = (io, driverId, eventName, data) => {
  io.emit(`driver-${driverId}-${eventName}`, data);
};

const broadcastDrivers = (io, eventName, data) => {
  io.emit(`drivers-${eventName}`, data);
};

const broadcastUsers = (io, eventName, data) => {
  io.emit(`users-${eventName}`, data);
};

const getNearbyDrivers = (drivers, userLocation, radius = 5000) => {
  // Filter drivers within radius
  // This is a simplified version - in production use geospatial queries
  const nearby = drivers.filter((driver) => {
    const distance = calculateDistance(userLocation, driver.location);
    return distance <= radius;
  });

  return nearby;
};

const calculateDistance = (point1, point2) => {
  // Haversine formula to calculate distance between two points
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(point2.latitude - point1.latitude);
  const dLon = deg2rad(point2.longitude - point1.longitude);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(point1.latitude)) * Math.cos(deg2rad(point2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

module.exports = {
  notifyUser,
  notifyDriver,
  broadcastDrivers,
  broadcastUsers,
  getNearbyDrivers,
  calculateDistance,
};
