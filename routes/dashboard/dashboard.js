const express = require('express');
const router = express.Router();
const comments = require('../../controllers/dashboard/dashboard')

router.get('/dashboard', async (req, res) => {
    const result = await comments.allquerydash(req, res)
    // console.log(result)
    // console.log(result)
    return res.render("html/dashboard", { layout: false, allquery: result })
})

router.get('/newquery', async (req, res) => {
    return res.render("html/newque", { layout: false })
})

router.get('/allquery', async (req, res) => {
    const result = await comments.singlequery(req, res);
    console.log("RESULTIS",result)
    return res.render("html/dispquery", { layout: false, singlequery: result })
})

router.post('/addquestions', async (req, res) => {
    // console.log(111);
    await comments.adding(req, res);
})

router.post('/addcomments', async (req, res) => {
    console.log(req.body,res)
    await comments.addcomment(req, res)
})

module.exports = router;