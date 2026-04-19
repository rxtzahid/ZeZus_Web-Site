const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('connect', () => {
  console.log('✓ Redis Connected Successfully');
});

redisClient.on('error', (error) => {
  console.error('✗ Redis Connection Error:', error.message);
});

module.exports = redisClient;
