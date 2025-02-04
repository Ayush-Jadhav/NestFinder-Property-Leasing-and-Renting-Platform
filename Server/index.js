const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; // Set a higher limit


// middleware for parsing req.body data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,              
 }));

// middleware for deal with file-upload
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// connect with database
const connectWithDB = require("./config/connectDB");
connectWithDB();

// connect with cloudinary
require("./config/connectCloudinary").connectCloudinary();

// getting PORT
require("dotenv").config();
const port = process.env.PORT || 3000;

// mount api-url with route
const route = require("./routes/route");
app.use("/api/v1",route);


app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
});

