const User = require('../model/User');
const connectDB = require('../config/dbConn');

const createUsersInOrder = async () => {
  try {
    await connectDB();

    for (let i = 1; i <= 20; i++) {
      await User.create({
        username: `User${i}`,
        email: `user${i}@example.com`,
        age: 20 + (i % 10),
        role: i % 2 === 0 ? 'Admin' : 'User'
      });
      console.log(`User${i} created`);
    }

    for (let i = 21; i <= 30; i++) {
      await User.create({
        username: `User${i}`,
        email: `user${i}@example.com`,
        age: 30 + (i % 10),
        role: i % 2 === 0 ? 'Admin' : 'Editor'
      });
      console.log(`User${i} created`);
    }

    for (let i = 31; i <= 40; i++) {
      await User.create({
        username: `User${i}`,
        email: `user${i}@example.com`,
        age: 40 + (i % 10),
        role: i % 2 === 0 ? 'Admin' : 'User'
      });
      console.log(`User${i} created`);
    }

    for (let i = 41; i <= 50; i++) {
      await User.create({
        username: `User${i}`,
        email: `user${i}@example.com`,
        age: 50 + (i % 10),
        role: i % 2 === 0 ? 'Admin' : 'User'
      });
      console.log(`User${i} created`);
    }

    console.log('✅ All 50 users created');
    return { message: '50 users created successfully' };
  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  }
};

module.exports = createUsersInOrder;