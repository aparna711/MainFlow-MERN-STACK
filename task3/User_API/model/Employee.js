// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        requires:true
    }
})

module.exports = mongoose.model('Employee', employeeSchema);