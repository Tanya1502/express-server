const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./user.json");
const postRouter = require("./controller/posts");
const userRouter = require("./controller/users");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { getAllBlogs } = require("./dao/blogs");

mongoose.connect('mongodb://127.0.0.1:27017/blogs').then((mongoose) => {
  console.log("Mongodb connected");
}).catch(error => console.log(error))

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  var user = users.find(u=> u.username == req.body.username && u.password == req.body.password);
 
  if(user){
    var token = jwt.sign({uername: user.username, role: user.role}, 'secret');
        res.send(token);
  }
  else{
        res.status(401).send("Auth failed");
  }

});
app.use("/post", postRouter);
app.use("/users", userRouter);
getAllBlogs();

app.listen(3000, () => {
  console.log("Server started in port: 3000 ");
});
