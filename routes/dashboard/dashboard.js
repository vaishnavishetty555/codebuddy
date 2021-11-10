const express = require('express');
const router = express.Router();

router.get('/dashboard', async(req, res) => {
    console.log("yess")
    return res.render("html/dashboard", { layout: false })
})

module.exports = router;