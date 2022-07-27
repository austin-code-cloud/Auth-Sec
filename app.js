// Requiring-dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const encrypt = require("moongoose-encryption")

const app = express();

// database-Connection
mongoose.connect("mongodb://localhost:27017/secretDb", {
    useNewUrlParser: true
});

// static-File-Connection
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// dataBase-Schema's
const newUserSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }

});


// dataBase-Model's
const newUser = mongoose.model("newUsers", newUserSchema);

// Get Requests
app.get("/", function (req, res) {
    res.render('home');
});

app.get("/login", function (req, res) {
    res.render('login');
});

app.get("/register", function (req, res) {
    res.render('register');
});

// Post Request
app.post("/register", function (req, res) {
    const newUser = new newUser({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err) {
            if (err) {
                console.log(err)
            } else {
                res.render('secrets')
            }
        }
    );
});

app.post("/login", function (req, res) {
    const userName = req.body.username
    const passWord = req.body.password

    newUser.findOne({
        username: userName
    }, function (err, result) {
        if (!err) {
            if (result.password === passWord) {
                res.render('secrets')
            } else {
                res.render('login')
            }
        } else {
            console.log(err)
        }
    });
});

// routings
app.get("/wrongPassword/:route", function (req, res) {
    req.params.route
});

// server-feedBack
app.listen(3000, function () {
    console.log("server is running on port 3000.");
});