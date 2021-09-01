import React,{useState} from 'react'
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'

export default function AddDeliveryVehicle() {

    
    const [vehicle_number, setvehicle_number] = useState("");
    const [owner_name, setowner_name] = useState("");
    const [owner_contactNumber, setowner_contactNumber] = useState("");
    const [owner_NIC, setowner_NIC] = useState("");
    const [owner_mail, setowner_mail] = useState("");
    const [isLoading, setLoading] = useState(false);


   async function sendData(e){
        setLoading(true);

        try{
            e.preventDefault();

            if(!vehicle_number || !owner_name || !owner_contactNumber || !owner_NIC || !owner_mail){
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all field",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {        
                    },     
                  });
            }else if(!validation.isEmail(owner_mail)){
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid mail address",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {         
                    },     
                  });
            }else{
            const newVehicle = {
                vehicle_number, owner_name, owner_contactNumber, owner_NIC ,owner_mail
            }

            const data = await axios.post("http://localhost:5000/vehicle/add", newVehicle)
            console.log(data)
            if (data.status === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "User added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                      window.location = "/viewVehicles"
                    },
                  });
            }else{
                alert("Something went wrong")
            }
        }
        }catch(err){

        }
    }



    return (
        <div class="content">
            <h3>ADD-DELIVERY-VEHICLE</h3><hr />

            <div className="form">
                <form class="was-validated" >
                    <form class="row g-3">
                        <div class="col-md-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" aria-describedby="inputGroupPrepend" required
                                    onChange={(e) => { setvehicle_number(e.target.value); }} />
                                <label for="floatingInput">Vehicle Number</label>
                                {/* <div class="invalid-feedback">
                                    Please choose a username.
                                </div> */}
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setowner_name(e.target.value); }} />
                                <label for="floatingInput">Full Name</label>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setowner_mail(e.target.value); }} />
                                <label for="floatingInput">Mail Address</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setowner_contactNumber(e.target.value); }} />
                                <label for="floatingInput">Mobile Number</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setowner_NIC(e.target.value); }} />
                                <label for="floatingInput">NIC</label>
                            </div>
                        </div>
                        <div class="col-12" id="button">
                            <button type="button" class="btn btn-secondary btn-lg" >CANCEL</button>&nbsp;&nbsp;
                            <button type="button" class="btn btn-primary btn-lg"
                                disabled={isLoading}
                                onClick={!isLoading ? sendData : null}>{isLoading ? 'Sending..' : 'SEND'}</button>
                        </div>
                    </form>
                </form>
            </div>
            
        </div>
    )
}
