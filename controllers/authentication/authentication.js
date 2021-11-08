const { validationResult } = require("express-validator");


module.exports.create = async (req, res) => {
    try {

        const result = validationResult(req, res);
        console.log(result);
        // if (!result.isEmpty()) {
        //     res.status(400).json(result.array()[0])
        //     return;
        // }
        const { email, usn, password, name } =  req.body 
        console.log("email,usn,password,name",email,usn,password,name);


    }
    catch (e) {
        console.log(e);
        res.json(500);
    }
}