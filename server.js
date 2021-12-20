let express = require('express');
let session = require('express-session');

let app = express();
app.use(express.static('public'));

let router = require('./routes');

let mysql = require('mysql');

app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret:'mysecret',
    resave:false,                
    saveUninitialized: true
}));


app.use('/',router);

app.listen("80", function() {
	console.log("Running on port 80");
});
