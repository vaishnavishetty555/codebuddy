const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path=require("path");

const app = express();

//EJS
app.use(expressLayouts);
app.set('views','./view')
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Routes

app.use(express.static(path.join(__dirname, "view")))
app.use('/',require('./routes/authentication/authentication')) //connecting index files to these routes

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`server running on ${PORT}`))