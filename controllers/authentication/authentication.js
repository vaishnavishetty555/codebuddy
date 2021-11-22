const { validationResult } = require("express-validator");
const Profile = require("../../model/profileSchema");
const bcrypt = require('bcryptjs');

module.exports.create = async(req, res) => {
    try {

        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty()) {
            res.status(400).json(result.array()[0])
            return;
        }
        const { email, usn, password, name } = req.body
        console.log("email,usn,password,name", email, usn, password, name);

        const profileEmail = await Profile.findOne({ $or: [{ email: email }, { usn: usn }] });
        if (profileEmail == null) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await Profile.create({ email: email, usn: usn, password: hash, name: name })
            res.status(200).json();
        } else {
            res.status(404).json();
        }

        // console.log(123, profileEmail);

    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}

module.exports.logto = async(req, res) => {
    console.log("!!!", req.body);
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json(result.array()[0])
            return;
        }
        const { email, password, usn } = req.body;
        console.log("email,usn,password", email, usn, password);

        const profileEmail = await Profile.findOne({ email: email });

        const comparing = await bcrypt.compare(password, profileEmail.password);
        console.log(comparing)
            // console.log("profileEmail",profileEmail,profileEmail.password,hash)

        if (profileEmail != null && comparing && usn == profileEmail.usn) {
            console.log("!!!!!!!!", profileEmail.password, password)
            res.status(200).json();
        } else {
            res.status(404).json();
        }


    } catch (e) {
        console.log(e);
        res.status(500).json()

    }
}