const express = require("express");
const app = express();
const session = require("express-session");
const $ = require("jquery");

require("./db/db");

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const userRouter = require('./controllers/userC');
const tourRouter = require('./controllers/tournamentC');
const homeRouter = require('./controllers/homeC')
const authRouter = require('./controllers/authC')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
    secret: "random string to protect login info",
    resave: false,
    saveUninitialized: false,
}))

app.use("/user", userRouter);
app.use("/tour", tourRouter);
app.use("/home", homeRouter);
app.use("/auth", authRouter);


app.listen(3000, err=>{
    console.log(err || "listening on 3000")
})