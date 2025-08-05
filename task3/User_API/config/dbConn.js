
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_STRING,{
            useUnifiedTopology : true,
            useNewUrlParser: true
        });
        //await mongoose.connect(process.env.DATABASE_STRING);
    }
    catch(err){
        console.error(err)
    }
}
module.exports = connectDB