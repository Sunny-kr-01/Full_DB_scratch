const express= require('express')
const my_router=module.require('./routes/user')
const{connectMongoDB}=require('./connection')
const my_users=require('./models/user')
const PORT=67;
const app= express();

app.use(express.urlencoded({extended:false}))

connectMongoDB('mongodb://127.0.0.1:27017/Revison')

app.use('/users',my_router);


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})
