
//RREQUIRED INSTANCES
var  express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      methodOverRide =require("method-override")
      expressSanitizer =require("express-sanitizer");
      mongoose = require("mongoose");

//DB CONNECTION

 mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true });
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(expressSanitizer());
 app.use(express.static("public"));
 app.use(methodOverRide("_method"));
 app.set("view engine","ejs");

//DB SCHEMA PATTERN 

 var blogSchenma = new mongoose.Schema({
  name:String,
  image:String,
  body:String,
  created:{type: Date ,default: Date.now}

 });
// DB MODEL CONFIG
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

//CREATE BLOG ROUTE

app.post("/blogs",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var body =req.body.bodypost;
  var newBlog= { name:name,image:image,body :body,};
     blog.create(newBlog,function(err,newlyCreated){
    if(err){
        console.log(err);
    }else{
      res.redirect("/blogs");
    };
  }); 
});


//NEW BLOG ROUTE

app.get("/blogs/new",function(req,res){
  res.render("new");
});

//SHOW BLOG ROUTE

app.get("/blogs/:id",function(req,res){
  blog.findById(req.params.id ,function(err ,foundBlog){
    if(err){
      console.log(err);
    }else{
      res.render("show",{blog:foundBlog});
    }
  });
});

//EDIT BLOG ROUTE
app.get("/blogs/:id/edit",function(req,res){
  blog.findById(req.params.id ,function(err ,foundBlog){
    if(err){
      res.redirect("/blogs")
    }else{
      res.render("edit",{blog:foundBlog});
    }
  });
 
});
//UPDATE BLOG ROUTE 
app.put("/blogs/:id",function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var body =req.body.bodypost ;
  var newBlog= { name:name,image:image,body :body};

  blog.findByIdAndUpdate(req.params.id,newBlog,function(err,updatedBlog){
  if(err){
    res.redirect("/blogs")
  }else{
    res.redirect("/blogs/"+req.params.id);
  }
})
});
//DELETE BLOG
app.delete("/blogs/:id",function(req,res){
  blog.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.send(err);
    }else{
      res.redirect("/blogs");
    }
  });
});


//APP LISTENING AT PORT 4500
app.listen(4500,function(){
console.log("RESTfull Blog App Server Running at port 4500.....");
});