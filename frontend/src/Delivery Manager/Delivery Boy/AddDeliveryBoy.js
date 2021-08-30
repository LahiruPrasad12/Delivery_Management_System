import React from 'react'
import "../Home.css"

export default function AddDeliveryBoy() {
    return (
        <div class="content">

            <h3>ADD-STAFF-BOY</h3><hr />

            <div className="form">
                <form class="was-validated" >
                    <form class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" aria-describedby="inputGroupPrepend" required />
                                <label for="floatingInput">First Name</label>
                                {/* <div class="invalid-feedback">
                                    Please choose a username.
                                </div> */}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label for="floatingInput">Last Name</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label for="floatingInput">Email address</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label for="floatingInput">NIC</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label for="floatingInput">Mobile Number</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label for="floatingInput">Staff ID</label>
                            </div>
                        </div>
                        <div class="col-12" id="button">
                            <button type="button" class="btn btn-secondary btn-lg">Cancel</button>&nbsp;&nbsp;
                            <button type="button" class="btn btn-primary btn-lg">Save</button>
                        </div>
                    </form>
                </form>
            </div>
        </div>
    )
}
