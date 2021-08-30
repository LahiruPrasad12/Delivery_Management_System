import React, { useState } from 'react'
import "../Home.css"
import axios from 'axios';

export default function AddDeliveryBoy() {

    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [mobile, setMobile] = useState("");
    const [NIC, setNIC] = useState("");
    const [mail, setMail] = useState("");
    const [Id, setID] = useState("");
    const [isLoading, setLoading] = useState(false);


    async function sendData(e) {
        setLoading(true);

        try {
            e.preventDefault();

            const newStaff = {
                Id,
                fName,
                lName,
                mobile,
                mail,
                NIC
            }

            const data = await axios.post("http://localhost:5000/DeliveryBoy/add", newStaff)
            if (data.status === 200) {
                window.location = "/"
            }else{
                alert("Something went wrong")
            }

        } catch (err) {
            alert(err.message)
        }

        setLoading(false);

    }


    return (
        <div class="content">

            <h3>ADD-STAFF-BOY</h3><hr />

            <div className="form">
                <form class="was-validated" >
                    <form class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" aria-describedby="inputGroupPrepend" required
                                    onChange={(e) => { setFname(e.target.value); }} />
                                <label for="floatingInput">First Name</label>
                                {/* <div class="invalid-feedback">
                                    Please choose a username.
                                </div> */}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setLname(e.target.value); }} />
                                <label for="floatingInput">Last Name</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setMail(e.target.value); }} />
                                <label for="floatingInput">Email address</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setNIC(e.target.value); }} />
                                <label for="floatingInput">NIC</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setMobile(e.target.value); }} />
                                <label for="floatingInput">Mobile Number</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required
                                    onChange={(e) => { setID(e.target.value); }} />
                                <label for="floatingInput">Staff ID</label>
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
