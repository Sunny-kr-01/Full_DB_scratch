const express= require('express')
const mongoose=require('mongoose')

const PORT=67;
const app= express();

app.use(express.urlencoded({extended:false}))

//mongoose.connect is a promise
mongoose.connect('mongodb://127.0.0.1:27017/Revison')
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
},{timestamps:true})

// MODEL
const my_users=mongoose.model('Users',users_schema);

app.route('/json/users/:id')
.get(async(req,res)=>{
    const id=req.params.id
    const user=await my_users.findById(id);
    res.json(user)
})
.patch(async(req,res)=>{
    const id=req.params.id
    const user=await my_users.findByIdAndUpdate(id,{
        last_name:"changed"
    });
    res.json({status:"success"})
})
.delete(async(req,res)=>{
    const id=req.params.id
    const user=await my_users.findByIdAndDelete(id);
    res.json({status:"success"})
})



app.post('/json/users',async(req,res)=>{
    const body=req.body;
    const result=await my_users.create(
        {
            first_name : body.first_name,
            last_name : body.last_name,
            email : body.email,
            gender : body.gender,
            job_title : body.job_title,
        }
    )
    res.status(200).json({status : "Success"})
})

app.get('/',(req,res)=>{
    res.end("Home Page")
})
app.get('/json/users',async(req,res)=>{
    const users= await my_users.find();
    res.json(users)
})
app.get('/users',async(req,res)=>{
    const users=await my_users.find();
    const html=`
    <ul>
    ${users.map((user)=>{
        return `<li>${user.first_name}</li>`
    }).join("")
}
    </ul>
    `
    res.send(html)
})
app.get('/json',(req,res)=>{
    res.end("For json file")
})


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})
