const express = require('express')
require('./src/db/mongoose')
// const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');

//Routes
const userRoute = require('./src/routers/user');
const ProviderRoute = require('./src/routers/provider');

const app = express()
const port = 3000

const router = express.Router();

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.json())

app.get("/", (req,res) =>{
    res.send("HOME PAGE")
})

//Passport
app.use(session({
    secret: '5INNAGip1cxf',
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

require('./src/config/passport')(passport);

app.use('/provider',ProviderRoute)
app.use('/user',userRoute)


app.listen(port, () => {
    console.log("Server is up on port " + port);
})

