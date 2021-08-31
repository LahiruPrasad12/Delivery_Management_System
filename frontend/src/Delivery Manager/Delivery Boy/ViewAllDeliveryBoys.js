import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewAllDeliveryBoys() {

  const [staff, setStaff] = useState([]);
  const [selectStaff, setSelectStaff] = useState([]);
  const [status, setStatus] = useState(true);


  const [btnStatus1, setbtnStatus1] = useState(false)
  const [btnStatus2, setbtnStatus2] = useState(true)



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


  function getdata(data) {
    setbtnStatus1(false)
    setbtnStatus2(true)
    setStatus(true)
    setSelectStaff(data)
  }

  function deleteUser() {
    alert("OK")
  }

  function editeUser(){
    setStatus(false)
    setbtnStatus1(true)
    setbtnStatus2(false)
  }



  return (
    <div className="content ">


      {/* This function used to view one user data in pop box */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">User ID - {selectStaff.Id}</h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <input type="text" class="form-control" id="recipient-name" value={selectStaff.fName} readOnly={status}/>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="recipient-name" value={selectStaff.lName} readOnly={status}/>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="recipient-name" value={selectStaff.NIC} readOnly={status}/>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="recipient-name" value={selectStaff.mail} readOnly={status}/>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="recipient-name" value={selectStaff.mobile} readOnly={status}/>
                </div>
              </form>
            </div>
            <div class="modal-footer" hidden={btnStatus1}>
              <button type="button" class="btn btn-primary"  onClick={(e)=>{editeUser()}}><i className="far fa-edit"></i> EDIT</button>
              <button type="button" class="btn btn-danger"> <i class="fa fa-trash"></i> DELETE</button>
            </div>

            <div class="modal-footer" hidden={btnStatus2}>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger"><i class="fa fa-wrench"></i>  UPDATE</button>
            </div>
          </div>
        </div>
      </div>{/* End Of the Pop up box */}





      {/* This part used to get all users data into table */}
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

            {staff.map((Staff) => {
              return <tr>
                {/* <th scope="row">{num}</th> */}
                <td>{Staff.Id}</td>
                <td> {Staff.fName} </td>
                <td> {Staff.lName} </td>
                <td> {Staff.mail} </td>
                <td> {Staff.mobile} </td>
                <td>{Staff.NIC}</td>
                <td><Link type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" className="Edit" onClick={() => { getdata(Staff) }}> <i className="far fa-edit"></i> </Link></td>
                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><i className="far fa-edit"></i> </button> */}

              </tr>

            })}
          </tbody>
        </table>

      </div>
      {/* End of the all users data get part */}

    </div>
  )
}
