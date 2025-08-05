const mongooose = require('mongoose');
const userSchema = new mongooose.Schema({
    username:{
        type:String,
        required:true
    },
    email: String,
    age: Number,
    role: String
});

module.exports = mongooose.model('User', userSchema)