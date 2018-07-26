
//Required instances

var   express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");



 mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true });
 app.use(bodyParser.urlencoded({extended:true}));
 app.set("view engine","ejs");

//schema of required pattern
 var blogSchenma = new mongoose.Schema({
  name:String,
  image:String,
});
// model of new blog
var blog = mongoose.model("blog",blogSchenma);

app.get("/",function(req,res){
  res.send("Your app Worked");
});

//post new post 
app.post("/blogs",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
   var newBlog= {
    name:name,
    image:image,
   
  };
  blog.create(newBlog,function(err,newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.send("Scuccessfully updated in the blog");
    };
  }); 
});
//new Blog Route
app.get("/blog/new",function(req,res){
  res.render("new");
});

//App Listening at port 4500
app.listen(4500,function(){
console.log("RESTfull Blog App Server Running at port 4500.....");
});