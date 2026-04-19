const demoData = {
  users: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+8801234567890',
      password: 'password123',
      role: 'user',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+8801987654321',
      password: 'password123',
      role: 'user',
    },
  ],
  drivers: [
    {
      licenseNumber: 'DL-123456',
      licenseExpiry: new Date('2026-12-31'),
      nidNumber: 'NID-987654',
    },
  ],
  promoCodes: [
    {
      code: 'WELCOME50',
      description: 'Welcome discount',
      discountType: 'percentage',
      discountValue: 50,
      maxDiscount: 500,
      minRideAmount: 500,
      maxUsagePerUser: 1,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      applicableTo: 'rides',
    },
  ],
};

module.exports = demoData;
