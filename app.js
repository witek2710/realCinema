require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./Config/Database');
const session = require('express-session');
const cors = require('cors');
const GoogleSrategy = require('passport-google-oauth20').Strategy;


// database connection
mongoose.connect(config.database);
mongoose.set("useCreateIndex", true);
mongoose.connection.on('connected', () => {
    console.log("Connected to database successfully");
});
mongoose.connection.on('error', (err) => {
    console.log("Connection to database with error: " + err);
});
// app initializing
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "Secret is very interesting",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// login/register user

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        googleId: {
            type: String
        },
        secret: {
            type: String
        }
    }
);

UserSchema.plugin(passportLocalMongoose);
User.plugin(findOrCreate);

const User = new mongoose.model("User", UserSchema);

passport.use(new GoogleSrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function(accessToken, refreshToken, profile, cb)
    {
      console.log(profile);

      User.findOrCreate({googleId: profile.id}, function(err, user)
      {
          return cb(err, user);
      });
    }
));

app.get("/auth/google",  passport.authenticate('google', {scope: ["profile"]}));

app.get("/auth/google/userHomePage", passport.authenticate('google', {failureRedirect: "/login"}),
        function(req, res){
            res.redirect('/userHomePage');
        });

app.get("/login", function(req, res)
{
    res.render("login");
});


app.get("/register", function(req, res)
{
    res.render("register");
});

app.get("/submit", function(req, res)
{
    if(req.isAuthenticated()){
        res.render("submit");
    }
    else
    {
        res.redirect("/login");
    }
});


app.post("/submit", function(req, res)
{
    const secretGiven = req.body.secret;

    User.findById(req.user.id, function(err, foundUser)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundUser){
                foundUser.secret = secretGiven;
                foundUser.save(function(){
                    res.redirect("/userHomePage");
                });
            }
        }
    });
});


app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});



app.post("/register", function(req, res)
{
    User.register({username: req.body.username}, req.body.password, function(err, user)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req, res, function(){
                res.redirect("userHomePage");
            });
        }
    });
});


app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            passport.authenticate("local")(req, res ,function(){
                res.redirect("/userHomePage");
            });
        }
    });
});


// app listen
app.listen(3000, () => {
    console.log("Server started on port 3000.");
});


// cors 

var originWhiteList = [
    'http://localhost:4200',
];

var corsOptions = {
    origin: function(origin, callbackURL)
    {
        var isWhiteListed = originWhiteList.indexOf(origin) !== -1;
        callbackURL(null, isWhiteListed);
    },
    credentials: true
}


app.use(cors(corsOptions));



