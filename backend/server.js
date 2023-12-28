const express = require('express');
const connectDB = require('./config/connectDB');
const dotenv = require("dotenv").config();
const errorHandler = require("./middelWares/errorMiddeelware");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { registerUser, loginUser, logout } = require('./controllers/userController');
const { doVote, getVoteList } = require('./controllers/voteController');
const protect = require('./middelWares/authMiddelware');



const app = express();
//middlewares
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Error Middelware
app.use(errorHandler);


//Route Middelwares
//app.use("/api/users", userRoute)
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);
app.get("/api/users/logout", logout);
app.post("/api/users/vote", protect, doVote);
app.get("/api/users/vote", protect, getVoteList);


const PORT = 5000;


const startServer = async () => {
    try {
        await connectDB(); // Corrected this line
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server : ', error);
    }
};

startServer();