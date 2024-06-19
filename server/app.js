//import express from "express";
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import { dbConnection } from './database/dbConnection.js'
import fileUpload from "express-fileupload";
import { ErrorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });


///////////////////////////////
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
//////////////////


app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "PUT", "DELETE", "POST"],
        credentials: true,
    })
);
//ending of the code that connects frontend to backend
app.use(cookieParser()); //when user logins a cookie is generated to obtain that cookie at our backend we use cookie parder as  mdleware
app.use(express.json()); //this middle ware is used to convert data into json format
app.use(express.urlencoded({ extended: true })); // define different data types used in the project

app.use(fileUpload({
    tempFileDir: "/tmp/",
    useTempFiles: true,
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

dbConnection();
app.use(ErrorMiddleware);


export default app;