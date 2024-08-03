const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const debtorRoute = require('./routes/debtor');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authentication");


const app = express();
const PORT = 8080;



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

//for css
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));



//for Ejs
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));


//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));




app.get("/" , (req , res) => {
    res.render("home");
})

app.use('/debtor' , debtorRoute);





app.listen(PORT  , ()=> {
    console.log(`Server Started at ${PORT}`);
      

})