const demoData = require('./demoData');

const seeder = async () => {
  try {
    console.log('Seeding database...');
    // Add your seeding logic here
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seeder;
