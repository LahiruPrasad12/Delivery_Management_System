import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewAllDeliveryBoys() {

    const [staff, setStaff] = useState([]);
    const [num, setNum] = useState(1)



    useEffect(() => {

        async function getAgent() {
            try {
                const result = await (await axios.get("http://localhost:5000/DeliveryBoy/view")).data.data
                setStaff(result);
            } catch (err) {
                alert(err)
            }
        }
        getAgent();

    })



    return (
        <div className="content ">

            <nav className="navbar bg-white">
                <div className="container-fluid">
                    <h3>VIEW-DELIVERY-BOYS</h3>
                    <button type="button" className="btn btn-warning" id="pdfButton"><i className="fa fa-file-pdf"></i>  PDF</button>
                    <form className="d-flex">

                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

                    </form>
                </div>

            </nav><hr />


            <div className="bodyContent">
                <table className="table table-dark table-hover">

                    <thead>
                        <tr>
                            {/* <th scope="col">NO</th> */}
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">NIC</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>

                        {staff.map((Staff)=> {
                            return <tr>
                                {/* <th scope="row">{num}</th> */}
                                <td>{Staff.Id}</td>
                                <td> {Staff.fName} </td>
                                <td> {Staff.lName} </td>
                                <td> {Staff.mail} </td>
                                <td> {Staff.mobile} </td>
                                <td>{Staff.NIC}</td>
                                <td><Link to={"#"} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                               
                            </tr>

                        })}
                        {/* <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td><Link to={"#"}> <i className="far fa-edit"></i> </Link></td>
                        </tr> */}

                    </tbody>
                </table>

            </div>

        </div>
    )
}
