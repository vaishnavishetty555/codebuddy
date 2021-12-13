const express = require('express');
const router = express.Router();
const comments = require('../../controllers/dashboard/dashboard')

router.get('/dashboard', async (req, res) => {
    console.log("yess")
    return res.render("html/dashboard", { layout: false })
})

router.get('/newquery', async (req, res) => {
    return res.render("html/newque", { layout: false })
})

router.get('/allquery', async (req, res) => {
    return res.render("html/dispquery", { layout: false })
})

router.post('/addquestions', async (req, res) => {
    // console.log(111);
    await comments.adding(req, res);
})

module.exports = router;