var express		=require('express');
var app			=express();
var bodyParser 	=require('body-parser');
var cookieParser 	=require('cookie-parser');
var passport	=require('passport');
var flash 		=require('connect-flash'); // flash, express-flash
var session 	=require('express-session'); // session, 

var connect 	=require('./config/database');


app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');


app.use(session( { secret : "jamesjoel" }));
app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());




app.use(flash());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname+'/public'));

app.use(require('./controllers/user'));



// require('./config/passport')(passport);



app.listen(3000, function(){
	console.log('Server Running');
});


