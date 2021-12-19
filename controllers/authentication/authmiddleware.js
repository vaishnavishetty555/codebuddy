const jwt = require("jsonwebtoken")
module.exports.auth = async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        console.log(2222222)

        res.redirect("/")
        return;

    }
    try {
        const res = jwt.verify(token, 'codebuddy');
        req.body.email = res.email;
        req.body.name = res.name;
        req.body.usn = res.usn;
        console.log("123", req.body.usn);
        return;
    } catch (error) {
        console.log(123, error);
        res.sendStatus(500);
    }

}