var express = require("express");
const bodyParser = require('body-parser');
var session = require('express-session');
const path = require('path');
const mongoose = require ('mongoose');
var cors = require('cors');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require("process");
const User = require('./users.js');
const Food = require('./food.js');
var app = express();
app.use(session({secret:'XASDASDA'}));
var ssn ;
app.use(bodyParser.urlencoded({ extended: false}));
//app.use (upload());
app.use(cors());
//app.use(cookieParser());
app.use(express.static('public'));
const url = "mongodb://localhost:27017/training";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

app.get("/users", (req, res)=>{
    /*
	const user = getCurrentUser();
	if (user==null || user.roleId != 2)
	{
		res.end("Not logged in or authorized");
		return;
    }
    */
	const connection = mongoose.connection;
	mongoose.model('users').find ((err,users)=>{
		res.send(users);
	});
});
app.get("/allfood", (req, res)=>{
    /*
	const user = getCurrentUser();
	if (user==null || user.roleId != 2)
	{
		res.end("Not logged in or authorized");
		return;
    }
    */
	const connection = mongoose.connection;
	mongoose.model('food').find ((err,food)=>{
		res.send(food);
	});
});
app.get("/user", (req, res)=>{
	const un=req.query.un;
	const connection = mongoose.connection;
	mongoose.model('users').findOne ({username: un},(err,user)=>{
		user.password="***";
		res.send(user);
	});
});
app.post("/login", (req, res)=>{
    console.log (req);
	const un=req.body.username;
    const pw=req.body.password;
    console.log ("username: "+un);
	const connection = mongoose.connection;
	mongoose.model('users').findOne ({username: un},(err,user)=>{
		if (user!=null && user.password==pw){
			 ssn=req.session;
             ssn.user=user;
			 
			res.send({status: 1, message:"User Logged in "});
			res.end();
		}else{
            res.send({status: -1, message:"login failed "});
            res.end();
		}
	});
});
app.get("/currentUser", (req, res)=>{
	try {
		const user=ssn.user;
		if (user==null){
			res.end("not logged in");
			return;
		}
		user.password="***";
		res.send(user);
		res.end();
	}catch (e){
		res.end("not logged in");
	}
})
app.get("/logout", (req, res)=>{
	ssn.user=null;
	res.end("logged out");
})
//addUser?un=may22&em=may22@test.com&pw=Test1234
app.post("/addUser", (req, res)=>{
	const un = req.body.username;
	const pw = req.body.password;
	const pw2 = req.body.password2;
	const em = req.body.email;
	if (pw.length<8 || pw != pw2)
	{
		res.end("Passwords don't match "+un);
		return;
	}
	var User = mongoose.model('users', User);
	const user =new User({
		username: un,
		email: em,
        password: pw,
        roleId:1,
		foodLog: []
	});
	user.save((err,user)=>{
		res.send (user);
	});
	
	//mongoose.model('users').create(user);
	
})
app.get("/addFood", (req, res)=>{
	user=getCurrentUser();
	if (user==null)
	{
		res.end("No user logged in!");
		return;
	}
    //addFood?name=Icecream&carbs=30&fat=50&protein=20&calories=290
    /*
	const food ={
		date: new Date(),
		name: req.query.name,
		carbs: req.query.name,
		fat: req.query.fat,
		protein: req.query.protein,
		calories: req.query.calories
    }
    */
    const food = { name: 'Cottage Cheese', info: { carbs: 44, fat: 50, protein: 10, calories: 179 } };
/*
	if (!foodValidate(food))
	{
		res.end("Missing data");
	}
	//user
	*/
	mongoose.model('users').findOne ({username: user.username},(err,u)=>{
		u.foodLog.push(food);
        u.save();
        console.log (u);
		res.end("item added");
	});
	//mongoose.model('users').create(user);
	
})
function foodValidate(food)
{
	if (food.name.length<2)
		return false;
	if (food.calories <1)
		return false;
	
	return true;
}
function getCurrentUser ()
{
	try {
		return ssn.user;
	}catch(e){
		return null;
	}
}
app.set('view engine', 'ejs');
app.post ("/addFoodLog", (req, res)=>{
    console.log ("message received:");
	//console.log ("cookies: "+req.cookies);
	var user=getCurrentUser();
	if (user==null)
	{
		res.end("user not logged in");
	}
	//const questions = JSON.parse(req.body.questions);
	const obj = {	
		_id: user._id,
		name:req.body.name,
		cals:req.body.cals,
		carbs:req.body.carbs,
		fat:req.body.fat,
		protein:req.body.protein
	};
	mongoose.model('users').findOne ({username: user.username},(err,user)=>{
			user.foodLog.push(obj);
			user.save((err,user)=>{
			res.end("Food blog added");
		});
	});
	//res.cookie('contact', obj).send("Sent");

});
app.get("/index",(req, res)=>{
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});
app.get("/new",(req, res)=>{
    res.render("member", {data: {_id:"!NEW", blogs:[]}});
});
app.get("/search",(req, res)=>{
    res.render("search");
});
app.post ("/member", (req, res)=>{
    console.log ("message received:");
	//console.log ("cookies: "+req.cookies);
	const blogs = req.body.blogs;
    const id = req.body.id;
    //[{"text":"hello", "access":"1"}, {"text":"world", "access":"0}];//JSON.parse();
    console.log(blogs);
//[{text:'hello', access:1}, {text:'world', access:0}]
	let obj = null;
    if (id=="!NEW")
    {
        const pw = req.body.password;
        if (pw==="password"||pw.length<8)
        {
            res.end("invalid password");
            return;
        }
        console.log ("new member");
        obj ={
            lastname: req.body.lastname,
            firstname: req.body.firstname,        
            email: req.body.email,      
            password: req.body.password,
            nickname: req.body.nickname, 
            birthdate: req.body.birthdate, 
		    blogs: JSON.parse(blogs)
	    };
    }
    else {
        console.log ("update member");
        obj ={
            lastname: req.body.lastname,
            firstname: req.body.firstname,        
            email: req.body.email,      
            password: req.body.password,
            nickname: req.body.nickname, 
            birthdate: req.body.birthdate, 
            blogs: JSON.parse(blogs)
        };
        console.log("updating");
    }
    console.log ("message received: "+obj.email);
	const url = getFileContents("mongo.con");
	console.log("Mongo-URL: "+url);

    var MongoClient = require('mongodb').MongoClient;
    //const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("training");
        if (id=="!NEW"){
            dbo.collection("members").insertOne(obj);
            ssn.user=obj;
        }
        else
            dbo.collection("members").updateOne({email:obj.email}, {$set:{blogs:obj.blogs,nickname:obj.nickname}});
    });
	
	//res.cookie('contact', obj).send("Sent");

	res.redirect("/home");
	res.end();
});

app.get("/members",(req, res)=>{
	var MongoClient = require('mongodb').MongoClient;
    //const url = "mongodb://localhost:27017/";
	//mongodb+srv://dbuser:Data2021@cluster0.aga82.mongodb.net/training?retryWrites=true&w=majority

	const url =getFileContents("mongo.con");
	console.log("Mongo-URL: "+url);
    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("training");
		 dbo.collection("members").find().toArray(function (err, result) {
            if (err)
                throw err;
			res.json (result);
            db.close();
			res.end();
        });
    });
});
app.post("/comments", (req, res)=>{
    var currentUser = ssn.user;
  console.log("Current User: "+currentUser.email);
   console.log(req.body.comment);
    const email=req.body.email;
    const idx=req.body.index;
    const comment = {commentBy: currentUser.email, text: req.body.comment, date: new Date()};
    const url =getFileContents("mongo.con");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, {useUnifiedTopology: true}, async function (err, db) {
    if (err)
        throw err;
        var dbo = db.db("training");
   
		var row= await dbo.collection("members").findOne({email:email});
        console.log(comment);
        if (row.blogs[idx]["comments"])// does this blog have existing comments?
        {
            row.blogs[idx]["comments"].push (comment);
        }else{// no existing comments;
            let comments =[];
            comments.push(comment);
            row.blogs[idx]["comments"]=comments;
        }
        //row.blogs[idx].comments=comment;
       // console.log(row.blogs[idx].comment);
        dbo.collection("members").updateOne({email:email}, {$set:row});
        res.json(row);
        res.end();	
    });

  // res.json (req);
  // res.end(JSON.stringify(req.body)); 
});
app.get("/member/:em",async (req, res)=>{
	var MongoClient = require('mongodb').MongoClient;
    //const url = "mongodb://localhost:27017/";
	//mongodb+srv://dbuser:Data2021@cluster0.aga82.mongodb.net/training?retryWrites=true&w=majority
    const email=req.params.em;
	const url =getFileContents("mongo.con");
	console.log("get email: "+email);
    MongoClient.connect(url, {useUnifiedTopology: true}, async function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("training");
		var row= await dbo.collection("members").findOne({email:email});
           
		res.json (row);
        db.close();
		res.end();
    });
});
app.get("/delete/:idx",async (req, res)=>{
	var MongoClient = require('mongodb').MongoClient;
    //const url = "mongodb://localhost:27017/";
	//mongodb+srv://dbuser:Data2021@cluster0.aga82.mongodb.net/training?retryWrites=true&w=majority
    const idx=req.params.idx;
    var currentUser = ssn.user;
    const email = currentUser.email;
	const url =getFileContents("mongo.con");
	console.log("delete : "+email);
    MongoClient.connect(url, {useUnifiedTopology: true}, async function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("training");
		var row= await dbo.collection("members").findOne({email:email});
        let blogs = row.blogs;
        let newBlogs=[];
        blogs.forEach ((blog, i)=>{
            if (i!=idx)
            {
                newBlogs.push (blog);
            }
        });
        row.blogs=newBlogs;
        dbo.collection("members").updateOne({email:email}, {$set:row});
		res.json (row);
           // db.close();
            
		res.end();
    });
});
app.get ("/home",(req, res)=>{
    try {
        var currentUser = ssn.user;
    }catch (e){
        res.redirect("/login");
        return;
    }
    if (currentUser==null)
    {
        res.redirect("/login");
        return;
    }
    const email=currentUser.email;
    var MongoClient = require('mongodb').MongoClient;
    const url =getFileContents("mongo.con");
    MongoClient.connect(url, {useUnifiedTopology: true}, async function (err, db) {
        if (err)throw err;

        var dbo = db.db("training");
        var row= await dbo.collection("members").findOne({email:email});
        res.render("member", {data:row});
        db.close();
		res.end();
    });
});
app.get("/logout", (req, res)=>{
    ssn.user=null;
    res.redirect("/login");
});
const getConn= ()=>{
    var MongoClient = require('mongodb').MongoClient;
    const url =getFileContents("mongo.con");
}



//res.end(cookies);
app.get("/login",  (req, res) =>{
    ssn=req.session;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h3>Login:</h3><form action="login" method="post">');
    res.write('<p>Username: <input type="text" name="username" placeholder="username"></p>');    
    res.write('<p>Password: &nbsp;<input type="password" name="password" placeholder="password"></p>');
    res.write('<p><input type="submit" value="Login"></p>');
    res.write('</form><a href="/new">Create profile</a>');
    res.end();
});

const port = 4001;//process.env.PORT || 4000;
console.log ("about to start");
app.listen(port, ()=>{
	console.log ("ok on port "+port);
});
function getFileContents(fileName)
{
    console.log("get file: "+fileName);
    var fs = require('fs');
    return fs.readFileSync(fileName, 'utf8');
}
