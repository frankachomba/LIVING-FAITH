import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
dotenv.config();
import morgan from "morgan"
import authrouter from "./routes/authrouter.js"
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
const port = process.env.PORT
connectDB();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/user", authrouter)
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);


app.use("*", (req, res) => {
    res.status(404).json({
        message:"Not found",
        success:false
    })
})
app.get('/test', (req, res)=>{

    res.send("paul is such a big head")
})

app.post('/register', (req, res)=>{

    res.send("this rout helps to make a post request")
})

app.listen(port, console.log("lfc Nigeria server is now live "))

