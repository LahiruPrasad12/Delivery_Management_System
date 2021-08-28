const router = require("express").Router();
const Vehicle = require("../../models/Delivery Manager/deliveryVehicleModel");

router.post('/add',async(req,res)=>{
    try{
        const {vehicle_number,owner_name,owner_contactNumber,owner_NIC,owner_mail} = req.body;
       
        const newVehicle = new Vehicle({
            vehicle_number,owner_name,owner_contactNumber,owner_NIC,owner_mail
        });

        const savedVehicle = await newVehicle.save();
        res.status(200).send({data : savedVehicle});

    }catch(err){
        res.status(500).send({status : err});
    }
})


router.get('/view', async(req,res)=>{
    try{
        const allVehicles = await Vehicle.find();
        res.status(200).send({data : allVehicles});
    }catch(err){
        res.status(500).send({data : err});
    }
})

module.exports = router;