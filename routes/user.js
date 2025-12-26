const express =require('express')
const my_users=require('../models/user')
const router=express.Router();

router.route('/:id')
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

router.post('/',async(req,res)=>{
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
router.get('/',async(req,res)=>{
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

module.exports =router;