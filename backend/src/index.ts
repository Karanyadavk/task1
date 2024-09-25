import express from "express";
import mongoose from "mongoose";
import contact from "./model/Contact";
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())



app.post("/submit", async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log(name, email, message);
    try {
        const info = await contact.create({
            name: name,
            email: email,
            message: message
        })
        console.log(info)
        res.status(200).json({
            message: "success",
            toast: "Success"
        })
    } catch (error) {
        res.status(411).json({
            error: error
        })
    }
})

app.get("/send", async(req, res) => {
    try {
        const info = await contact.find();
        console.log("found : " , info)
        res.status(200).json({
            info
        })
    } catch (error) {
        res.status(411).json({
            error
        })
    }
})


mongoose.connect("mongodb://localhost:27017/mongodb")
app.listen(port, () => {
    console.log("Server listening on PORT", port);
    }).on('error', (err: Error) => {
    console.error(err); 
});