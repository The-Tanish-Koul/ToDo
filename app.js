//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://tanishkoul123:tanish123@cluster0.wuxflb5.mongodb.net/todoFinalDB", {useNewUrlParser: true})


const itemsSchema = new mongoose.Schema({

  name:String

})

const Item = mongoose.model("item",itemsSchema)

const defaultItems = []


app.get("/", function(req, res) {

  const day = date.getDate();
  Item.find()
  .then(function(FoundItems){
    
    res.render("list", {listTitle: day, newListItems: FoundItems});
  })




});

app.post("/", function(req, res){

  
  const itemName = req.body.newItem;
  const item = new Item({
    name : itemName
  })
  item.save()
  res.redirect("/")

  
  
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox
  console.log(checkedItemId);

  Item.findByIdAndRemove({_id: req.body.checkbox})
  .then(function(err){
    if (!err) {
      console.log("Sucessfully deleted");
      
    }
    else{
      console.log("ERROR");
    }
  })
  res.redirect("/")

})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
