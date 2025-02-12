const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

main().then(() =>{
    console.log("connected to DB");
}) .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 }

 app.set("view engine", "ejs");
 app.set("views", path.join(__dirname, "views"));
 app.use(express.urlencoded({extended: true}))
 app.use(methodOverride("_method")); 

app.get("/", (req, res) =>{
    res.send("Hi, I am root");
})

// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Indore",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("Successful testing ");
// })
 
// index route
app.get("/listings", async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

// New route
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs");
})

// show route
app.get("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

})

// Create Route
app.post("/listings/", async (req, res) =>{
    // let {}
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings"); 
    // console.log(listing);
})

//Edit route
app.get("/listings/:id/edit", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

// Update Route
app.put("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);   
})

//delete route
app.delete("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})



app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});