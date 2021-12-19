const express = require('express');
const router = express.Router();
const comments = require('../../controllers/dashboard/dashboard')
const auth = require("../../controllers/authentication/authmiddleware")

router.get('/dashboard', async (req, res) => {
    try {
        await auth.auth(req, res);
        const result = await comments.allquerydash(req, res)
        // console.log(result)
        // console.log(result)
        const { name } = req.body
        // console.log(name)
        return res.render("html/dashboard", { layout: false, allquery: result, profilename: name })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})



router.get('/newquery', async (req, res) => {
    try {
        await auth.auth(req, res);
        const { name } = req.body
        return res.render("html/newque", { layout: false, profilename: name })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/allquery', async (req, res) => {
    try {
        await auth.auth(req, res);

        const result = await comments.singlequery(req, res);
        // console.log("RESULTIS", result)
        const { name } = req.body
        return res.render("html/dispquery", { layout: false, singlequery: result, profilename: name })
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})

router.post('/addquestions', async (req, res) => {
    // console.log(111);
    try {
        await auth.auth(req, res);
        await comments.adding(req, res);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/addcomments', async (req, res) => {
    try {
        console.log(req.body, res)
        await auth.auth(req, res);
        await comments.addcomment(req, res)
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})

module.exports = router;