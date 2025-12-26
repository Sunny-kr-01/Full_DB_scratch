const mongoose=require('mongoose')

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
},{timestamps:true})

const my_users=mongoose.model('Users',users_schema);

module.exports=my_users;