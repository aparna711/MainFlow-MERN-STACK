// In a separate file or script
// require('dotenv').config();
const User = require('./model/User');
const connectDB = require('./config/dbConn');
connectDB();

for (let i = 1; i <= 50; i++) {
  User.create({
    username: `User${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 10),
    role: i % 2 === 0 ? 'Admin' : 'User'
  });
}
console.log('50 demo users created successfully');