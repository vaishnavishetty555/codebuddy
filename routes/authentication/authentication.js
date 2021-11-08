const express = require('express');
const router = express.Router();
const authentication = require('../../controllers/authentication/authentication')
//Login Page
router.get('/',(req,res)=>{
    return res.render("html/login",{layout:false})
})

//Register Page
router.get('/register',(req,res)=>{
    return res.render("html/register",{layout:false})
})

router.post('/register',async(req,res)=>{
    await authentication.create(req,res);
    console.log("req",req.body)
})

module.exports = router;