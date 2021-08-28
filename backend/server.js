const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
require("dotenv").config();


/*---------------------------------------Set Up Server-------------------------------------------*/
const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server start on port : ${PORT}`)
})



/*---------------------------------------connect to mongoDB-------------------------------------------*/
//connect to mongoDB
const URL= process.env.MONGO_CONNECT;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false

})
const connection =mongoose.connection;
connection.once("open", ()=>{
    console.log("connection success")
})


/*---------------------------------------connect to mongoDB-------------------------------------------*/
app.use("/vehicle", require("./routes/Delivery Manager/deliveryVehicleRoutes"));
app.use("/DeliveryBoy", require("./routes/Delivery Manager/deliveryBoyRoutes"));