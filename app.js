const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");

main().then(() =>{
    console.log("connected to DB");
}) .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlst');
 }

app.get("/", (req, res) =>{
    res.send("Hi, I am root");
})

app.get("/testListing", async (req, res) =>{
    let sampleListing = new listing({
        title: "My New Villa",
        price: 1200,
        location: "Indore",
        country: "India",
    });

    await sampleListing.save();
    console.log("sample saved");
    res.send("Successful testing ");
})
   
app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});