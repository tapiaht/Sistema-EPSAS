import express from "express";
import cors from 'cors'
import { AdminRouter } from "./routes/AdminRoute.js";
import { EmployeeRouter } from "./routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//import mongoose from "mongoose"
//const mongoose = require("mongoose");
import authenticateToken from "./auth/authenticateToken.js";

//import log from "./lib/trace";
//const authenticateToken = require("./auth/authenticateToken");

//const log = require("./lib/trace");
import dotenv from "dotenv";

import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import refreshTokenRouter from "./routes/refreshToken.js";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

dotenv.config();
//require("dotenv").config();

const app = express() 
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', AdminRouter)
app.use('/employee', EmployeeRouter)
app.use(express.static('Public'))

const port = process.env.PORT || 3000;

// async function main() {
//     await mongoose.connect(process.env.DB_CONNECTION_STRING);
  
//     console.log("Conectado a la base de datos");
//   }
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/signout", logoutRouter);

// Ruta para renovar el token de acceso utilizando el token de actualización
app.use("/api/refresh-token", refreshTokenRouter);

app.use("/api/posts", authenticateToken, postsRouter);
app.use("/api/user", authenticateToken, userRouter);
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )

// app.listen(3000, () => {
//     console.log("Server is running")
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
//   main().catch((err) => console.log(err));*