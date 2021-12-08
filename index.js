const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require("path");
const mongoose = require('mongoose');

const app = express();

//EJS
app.use(expressLayouts);
app.set('views', './view')
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// mongoDB connection

mongoose.connect('mongodb+srv://Vineeth_11_:Vini12345@cluster0-z6unz.mongodb.net/codebuddy?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') } else { console.log('Error in DB connection : ' + err) }
});

//Routes

app.use(express.static(path.join(__dirname, "view")))
app.use('/', require('./routes/authentication/authentication')) //connecting index files to these routes
app.use('/', require('./routes/dashboard/dashboard'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on ${PORT}`))