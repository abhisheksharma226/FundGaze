const express = require("express");
const path = require("path");
const debtorRoute = require('./routes/debtor');
const mongoose = require("mongoose");
const dotenv = require("dotenv");



const app = express();
const PORT = 3000;

dotenv.config();


// DB Connection
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 5000, // Optional: Adjust as needed
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error Connecting To MongoDB:", error.message);
    }
};

// Call the function to connect to MongoDB
connectToMongoDB();




//for Ejs
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.get("/" , (req , res) => {
    res.render("home");
})

app.use('/debtor' , debtorRoute);





app.listen(PORT  , ()=> {
    console.log(`Server Started at ${PORT}`);
})