const express= require('express')
const mongoose=require('mongoose')

const app= express();

//mongoose.connect is a promise
mongoose.connect('mongodb://127.0.0.1:27017')
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log("Mongo error : ",err);
})

const users_schema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    job_title:{
        type:String,
        required:true,
    }
})
