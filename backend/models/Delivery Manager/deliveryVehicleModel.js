const mongoose = require("mongoose");

const deliveryVehicle = new mongoose.Schema({
    vehicle_number : { type: String, required : true },
    owner_name : { type: String, required : true },
    owner_contactNumber : { type: Number, required : true },
    owner_NIC : {type: String, required : true },
    owner_mail : {type: String, required : true }
   
});

const DeliveryVehicle = mongoose.model("Delivery_Vehicle",deliveryVehicle);

module.exports = DeliveryVehicle;