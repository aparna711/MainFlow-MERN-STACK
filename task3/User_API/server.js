require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/dbConn');
const User = require("./model/User.js")

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"/views"))
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files (including Bootstrap) from node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

//Connect to MongoDB
connectDB();

//  Connect server only if mongoDB server is connected
mongoose.connection.once('open',() =>{
    console.log('Connected to MongoDB');
    app.listen(PORT , ()=> console.log(`Server is listening ${PORT}`));
})

//Operation Buffering
/*
Routes : (Todo ny hitesh choudary)
1] Index route (Displays all the inserted data)
2] Find by Id
3] Edit route via id and new content 
4] Delete route via id
*/

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

//Home route to render the registration form
app.get('/',(req,res)=>{
  console.log("Home route accessed");
  res.render('register.ejs');
     
 })

// Insert new user's data into MongoDB
app.post('/index', async (req, res) => {
  console.log(req.body); // { username: '...', email: '...', age: '...', role: '...' }
  const {username, email, age, role} = req.body;
  const newUser = new User({
    username,
    email,
    age,
    role
  });

  await newUser.save()
  .then(()=>  res.redirect('/index'))
  .catch(err =>  res.status(500).send("Error saving user : " +err))
  

});
//List all users
app.get('/index', async(req,res)=>{
   const users = await User.find();
   res.render('index', {users, title: 'All Users'}); // Render the view with all users
})

// Find by Id route
app.get('/user/find', (req, res) => {
  res.render('find_by_id.ejs'); // Render the form to find a user by ID
});

app.get('/user/find/:id', async(req,res) =>{
  try{
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      console.log("User found:", user);
      res.status(200).json({
          message: "User found",
          user: user
        })
  }
  catch(err){
      console.error("Error fetching user by ID:", err);
      res.status(500).send("Error fetching user by ID: " + err);
  }

});

//Find User whose age > 25
app.get('/user/age-above-25', async (req, res) =>{
  try{
      const users = await User.find({age: {$gt:25}});
      if(users.length === 0){
          return res.status(404).send("No users found above age 25");
      }
      res.render('index.ejs', { users, title: 'Users above age 25' }); // Render the view with users above age 25
    }
    catch(err){
    res.status(500).send("Error fetching users' data above age 25:" +err)
  }
});

//Find User whose role is Admin
app.get('/user/role-admin', async (req, res) => {
  try {
    const users = await User.find({ role: 'Admin' });
    if (users.length === 0) {
      return res.status(404).send("No users found with role Admin");
    }
    res.render('index.ejs', { users , title : 'Users whose role is Admin' }); // Render the view with users having role Admin
  } catch (err) {
    res.status(500).send("Error fetching users with role Admin: " + err);
  }
});
//Edit and Update routes
app.get('/edit/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('update.ejs', { user});
});
app.patch('/edit/:id', async(req,res)=>{
  const userId = req.params.id;
  console.log("User ID to edit:", userId);
  console.log("Updated data:", req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    // ⚠️ res.status() + res.redirect() together = bug
    // Remove one of them
    res.redirect('/index'); // Recommended
    // OR if you're using AJAX:
    // res.status(200).json({ message: "User updated", user: updatedUser });

  } catch (err) {
    res.status(500).send("Error updating user: " + err);
  }
})

// Delete route
app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;
  console.log("User ID to delete:", userId);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("Deleted User:", deletedUser);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    // ⚠️ res.status() + res.redirect() together = bug
    // Remove one of them
    res.redirect('/index'); // Recommended
    // OR if you're using AJAX:
    // res.status(200).json({ message: "User deleted", user: deletedUser });

  } catch (err) {
    res.status(500).send("Error deleting user: " + err);
  }
});

//Pagination route
// Route to display users with pagination
app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; // Number of users per page
  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments();
  //console.log(`Total users: ${totalUsers}, Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

  // Fetch users with pagination
  const users = await User.find().skip(skip).limit(limit);

  const totalPages = Math.ceil(totalUsers / limit);

  res.render('pagination/users.ejs', {
    users,
    currentPage: page,
    totalPages
  });
});
//Sort BY AGE
app.get('/users/sort', async (req, res) => {
  res.render('pagination/sort_by_age.ejs'); // Render the form to sort users by age
});

app.get('/users/sort-by-age', async (req, res) => {
  const sort = req.query.sort === 'desc' ? -1 : 1;
  const users = await User.find().sort({ age: sort })
  res.render('include/table.ejs', {
    users, title: `Sorted Users by ${req.query.sort} order of Age`,
  });
});

// Projection route
app.get('/users/name-and-email', async (req, res) => {
  const users = await User.find({}, 'username email'); // Fetch only username and email
  console.log("Projection users:", users);
  res.render('projection.ejs', {users}); // Render the form to fetch only name and email
});

// Increment age by 1 for all users
app.patch('/users/increment-age-by-1', async (req, res) => {
  try {
    const result = await User.updateMany({}, { $inc: { age: 1 } });
    //console.log("Users updated:", result);
    res.redirect('/index'); // Redirect to the index page after updating
  } catch (err) {
    console.error("Error incrementing age:", err);
    res.status(500).send("Error incrementing age: " + err);
  }
});
// Delete all users whose age is greater than 50
app.delete('/user/delete-users-age-over-50', async (req, res) => {
  try {
    const result = await User.deleteMany({ age: { $gt: 50 } , role: "User" });
    //console.log("Users deleted:", result);
    res.redirect('/index'); // Redirect to the index page after deleting
  } catch (err) {
    console.error("Error deleting users:", err);
    res.status(500).send("Error deleting users: " + err);
  }
});
// // Show all inserted data
// app.get('/index', async (req, res) => {
//     try {
//       console.log("hello")
//         const users = await User.find();
//         console.log("hello")
//         let html = `<h2>All Users</h2><ul>`;
//         users.forEach(user => {
//             html += `<li>${user.username} | ${user.email} | ${user.age} | ${user.role}</li>`;
//         });
//         html += `</ul><a href="/">Add more users</a>`;
//         res.send(html);
//     } catch (err) {
//         res.status(500).send('Error fetching users');
//     }
// });


// Method 2: Handle form submission
// app.post('/index', async (req, res) => {
//   try {
//     const { username, email, age, role } = req.body;
//     const newUser = new User({ username, email, age, role });
//     await newUser.save();
//     res.redirect('/index'); // Only one response here
//   } catch (err) {
//     res.status(500).send("Error saving user: " + err);
//   }
// }); 

// Method 3: Handle form submission
// app.post('/submit', async (req, res) => {
//     try {
//         const { username, email, age, role } = req.body;
//         await User.create({ username, email, age, role });
//         res.redirect('/index');
//     } catch (err) {
//         res.status(500).send('Error inserting data');
//     }
// });



