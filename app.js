
//Required instances

var   express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");

 mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true });
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static("public"));
 app.set("view engine","ejs");

//schema of required pattern
 var blogSchenma = new mongoose.Schema({
  name:String,
  image:String,
  body:String,
  created:{type: Date ,default: Date.now}

 });
// model congiguration
var blog = mongoose.model("blog",blogSchenma);

//RESTFULL ROUTES

app.get("/",function(req,res){
res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
  blog.find({},function(err,blogs){
   if(err){
     console.log("Error");
   }else{
    res.render("index",{blogs :blogs});
   }
  });
});

app.post("/blogs",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var body = req.body.bodypost;
   var newBlog= {
    name:name,
    image:image,
    body :body,
};
  blog.create(newBlog,function(err,newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.redirect("/blogs");
    };
  }); 
});
//new Blog Route
app.get("/blogs/new",function(req,res){
  res.render("new");
});

//App Listening at port 4500
app.listen(4500,function(){
console.log("RESTfull Blog App Server Running at port 4500.....");
});