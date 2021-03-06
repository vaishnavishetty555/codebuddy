const { validationResult } = require("express-validator");
const Profile = require("../../model/profileSchema");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");

module.exports.create = async(req, res) => {
    try {

        const result = validationResult(req);
        // console.log(result);
        if (!result.isEmpty()) {
            res.status(400).json(result.array()[0])
            return;
        }
        const { email, usn, password, name } = req.body
        // console.log("email,usn,password,name", email, usn, password, name);

        const profileEmail = await Profile.findOne({ $or: [{ email: email }, { usn: usn }] });
        if (profileEmail == null) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await Profile.create({ email: email, usn: usn, password: hash, name: name })
            res.status(200).json();
        } else {
            res.status(404).json();
        }

       

    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}

module.exports.logto = async(req, res) => {
    
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json(result.array()[0])
            return;
        }
        const { email, password, usn } = req.body;
        const profileEmail = await Profile.findOne({ email: email });

        const comparing = await bcrypt.compare(password, profileEmail.password);
        if (profileEmail != null && comparing && usn == profileEmail.usn) {

            const jwtsecret="codebuddy";
            const token=await jwt.sign({
               email:profileEmail.email,
               usn:profileEmail.usn,
               name:profileEmail.name,
    
            },jwtsecret);
    
            res.cookie("token",token,{
                expires:new Date(Date.now()+24*60*60*1000),
                httpOnly:true,
                path:"/"
            });
            res.status(200).json();
        } else {
            res.status(404).json();
        }
       




        


    } catch (e) {
        console.log(e);
        res.status(500).json()
        return

    }
}


module.exports.logout = async(req, res) => {
    
    try {
        console.log(222);
       res.clearCookie("token",{
           httpOnly:true,
           path:"/"
       }).sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).json()

    }
}