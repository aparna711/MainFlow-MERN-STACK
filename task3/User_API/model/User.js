const mongooose = require('mongoose');
const userSchema = new mongooose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
       // unique: true
    },
    age: Number,
    role: String
});

module.exports = mongooose.model('User', userSchema)