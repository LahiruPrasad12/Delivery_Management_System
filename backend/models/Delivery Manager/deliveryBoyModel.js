const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema({
    Id : { type: String, required : true },
    fName : { type: String, required : true },
    lName : { type: String, required : true },
    mobile : { type: String, required : true },
    mail : { type: String, required : true },
    NIC : { type: String, required : true },
   
});

const DeliveryBoy = mongoose.model("Delivery_Boy",deliveryBoySchema);

module.exports = DeliveryBoy;