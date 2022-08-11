import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"
import userRoutes from './routes/users.js'


const app = express();
app.use(cors())
app.use(express.json({limit:"30mb", exptended : true}))
app.use(express.urlencoded({limit:"30mb", exptended : true}))
app.use("/posts", postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000
const CONNECTION_URL = "mongodb+srv://Muqto:password14@mern.gxlwzwq.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`Connected to port: ${PORT}`)}))
.catch((err) => console.log(`Error is: ${err}`));