const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config();

const app = express()

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI,{useNewUrlParser: true, useunifiedTopology:true})
    .then(()=>console.log("MOngoDB Connected"))
    .catch((err)=> console.log(err))


app.get("/",(req,res)=>{
    res.send("Backend is running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));