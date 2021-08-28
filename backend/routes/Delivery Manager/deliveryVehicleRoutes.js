const router = require("express").Router();
const Vehicle = require("../../models/Delivery Manager/deliveryVehicleModel");

router.post('/add',async(req,res)=>{
    try{
        const {name} = req.body;
        const newVehicle = new Vehicle({
            name
        });

        const savedVehicle = await newVehicle.save();
        res.status(200).send({data : savedVehicle});

    }catch(err){
        res.status(500).send({status : err});
    }
})

module.exports = router;