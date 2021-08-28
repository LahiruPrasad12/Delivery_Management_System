const router = require("express").Router();
const DeliveryBoy = require("../../models/Delivery Manager/deliveryBoyModel");

//Add new vehicle
router.post('/add',async(req,res)=>{
    try{
        const {Id,fName,lName,mobile,mail,NIC} = req.body;
       
        const newBoy = new DeliveryBoy({
            Id,fName,lName,mobile,mail,NIC
        });

        const savedBoy = await newBoy.save();
        res.status(200).send({data : savedBoy});

    }catch(err){
        res.status(500).send({status : err});
    }
})



//View all vehicles
router.get('/view', async(req,res)=>{
    try{
        const allBoys = await DeliveryBoy.find();
        res.status(200).send({data : allBoys});
    }catch(err){
        res.status(500).send({data : err});
    }
})



//update vehicles
router.put("/update/:id", async(req,res)=>{
    try{
        let _id = req.params.id;
        const {Id,fName,lName,mobile,mail,NIC} = req.body;

        const updateBoy = new DeliveryBoy({
           _id, Id,fName,lName,mobile,mail,NIC
        });

        await DeliveryBoy.findByIdAndUpdate(_id,updateBoy)
        res.status(200).send({data : updateBoy});
             
    }catch(err){
        res.status(500).send({data : err});
    }
})


//This route used to view specific vehicle from table
router.get('/view/:id',async(req,res)=>{
    try{
        let id = req.params.id;
        const vehicle = await Vehicle.find({vehicle_number : id})
        res.status(200).send({data : vehicle});

    }catch(err){
        res.status(500).send({data : err});
    }

})


//This route used to delete vehicle from table
router.delete('/remove/:id',async(req,res)=>{

    try{
        var id = req.params.id;
        console.log(id);
        const updateData = await Vehicle.findByIdAndDelete(id)
        res.status(200).send({data : updateData});
    

    }catch(err){
        res.status(500).send({data : err});
    }

})

module.exports = router;