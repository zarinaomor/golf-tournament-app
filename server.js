const express = require("express");
const app = express();

require("./db/db");

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const userRouter = require('./controllers/userC');
const tourRouter = require('./controllers/tournamentC');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use("/user", userRouter);
app.use("/tour", tourRouter);


app.listen(3000, err=>{
    console.log(err || "listening on 3000")
})