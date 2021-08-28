const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema({
    name : { type: String, required : true },
   
});

const DeliveryBoy = mongoose.model("Delivery_Boy",deliveryBoySchema);

module.exports = DeliveryBoy;