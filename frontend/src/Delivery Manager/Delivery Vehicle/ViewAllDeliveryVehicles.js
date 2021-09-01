import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ViewAllDeliveryVehicles() {

    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [staff, setStaff] = useState([]);

      //This useEffect function used to get all user's data
  useEffect(() => {
    async function getStaff() {
      try {
        const result = await (await axios.get("http://localhost:5000/vehicle/view")).data.data
        setStaff(result);
      } catch (err) { 
      }
    }
    getStaff();
  })


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        setfiltered(
          staff.filter(items => {
            return items.vehicle_number.toLowerCase().includes(search.toLowerCase())
              || items.owner_name.toLowerCase().includes(search.toLowerCase())
          })
        )
      }, [search, staff])



      function getdata(){

      }

    return (
        <div className="content ">
             <nav className="navbar bg-white">
        <div className="container-fluid">
          <h3>VIEW-DELIVERY-VEHICLES</h3>
          <button type="button" className="btn btn-warning" id="pdfButton" ><i className="fa fa-file-pdf"></i>  PDF</button>
          <form className="d-flex">

            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              onChange={e => { setsearch(e.target.value) }} />

          </form>
        </div>

      </nav><hr />


      <div className="bodyContent">
        <table className="table table-dark table-hover">

          <thead>
            <tr>
              <th scope="col">Vehicle Number</th>
              <th scope="col">Owner Name</th>
              <th scope="col">Owner Mobile</th>
              <th scope="col">Owner Mail</th>
              <th scope="col">Owner NIC</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>

            {filtered.slice(0).reverse().map((Staff) => {
              return <tr>
                <td>{Staff.vehicle_number}</td>
                <td> {Staff.owner_name} </td>
                <td> {Staff.owner_contactNumber} </td>
                <td> {Staff.owner_NIC} </td>
                <td> {Staff.owner_mail} </td>
                <td><Link type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" className="Edit" onClick={() => { getdata(Staff) }}> <i className="far fa-edit"></i> </Link></td>
              </tr>

            })}
          </tbody>
        </table>

      </div>
      {/* End of the all users data get part */}

    </div>
        
    )
}
