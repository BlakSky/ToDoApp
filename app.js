var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOv = require("method-override");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOv("_method"));
app.use(express.static("public"));
app.use(express.static("partials"));

app.set("view engine","ejs");

// add DB

mongoose.connect("mongodb://localhost/list")

// Add model/schema for todo - 1 string

var listSchema = new mongoose.Schema({
	do: String
});

var List = mongoose.model("List",listSchema);

// make initial route

app.get("/",function(req,res){
	List.find({},function(err,foundList){
		if(err){
			console.log(err)
			res.send("Sorry, but we have encountered an error: " + err)
		} else {
			res.render("main",{lists:foundList})
		}
	});
});

app.post("/",function(req,res){
	List.create({
		do: req.body.content
	},function(){res.redirect('/')});
})

app.delete("/:id",function(req,res){
	List.findByIdAndRemove(req.params.id,function(err,del){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			res.redirect("/");
		}
	});
});

// listen
app.listen(3000)