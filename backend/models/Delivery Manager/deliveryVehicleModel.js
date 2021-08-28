const mongoose = require("mongoose");

const deliveryVehicle = new mongoose.Schema({
    vehicle_number : { type: Number, required : true },
    vehicle_name : { type: String, required : true },
    vehicle_owner : { type: String, required : true },
    owner_contactNumber : { type: String, required : true },
    owner_NIC : {type: String, required : true }
   
});

const DeliveryVehicle = mongoose.model("Delivery_Vehicle",deliveryVehicle);

module.exports = DeliveryVehicle;