const express = require('express');
const router = express.Router();
const authentication = require('../../controllers/authentication/authentication')
const { body, query } = require('express-validator')

//Validator
let registerValidator = [
    body("email")
    .exists()
    .withMessage("Please provide an email")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .bail()
    .normalizeEmail(),

    body("password")
    .exists()
    .withMessage("Please provide a password")
    .bail()
    .isAlphanumeric()
    .isLength({ min: 6, max: 20 })
    .withMessage("Please provide a password between 6-20 characters in length")


]

//Login Page
router.get('/', async(req, res) => {
    return res.render("html/login", { layout: false })
})

//Register Page
router.get('/register', (req, res) => {
    return res.render("html/register", { layout: false })
})

router.post('/register', registerValidator, async(req, res) => {
    await authentication.create(req, res);
    // console.log("req",req.body)
})

router.post('/login', registerValidator, async(req, res) => {
    await authentication.logto(req, res);
    // console.log("req", req.body)

})

module.exports = router;