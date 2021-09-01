import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"


export default function ViewAllDeliveryBoys() {

  const [staff, setStaff] = useState([]);
  const [selectStaff, setSelectStaff] = useState([]);
  const [status, setStatus] = useState(true);
  const [btnStatus1, setbtnStatus1] = useState(false)
  const [btnStatus2, setbtnStatus2] = useState(true)

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [NIC, setNIC] = useState("");
  const [mail, setMail] = useState("");
  const [Id, setID] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);


  const [loaderStatus, setLoaderStatus] = useState(false);
  const [tableStatus, setTablestatus] = useState(true);

  //This useEffect function used to get all user's data
  useEffect(() => {

    async function getStaff() {

      try {
        const result = await (await axios.get("http://localhost:5000/DeliveryBoy/view")).data.data
        setStaff(result);
        setTablestatus(false)
        setLoaderStatus(true)
      } catch (err) {
        console.log(err.message)
      }
    }
    getStaff();

  })


  //This useEffect method is used to perform a searching function
  useEffect(() => {
    setfiltered(
      staff.filter(items => {
        return items.fName.toLowerCase().includes(search.toLowerCase())
          || items.lName.toLowerCase().includes(search.toLowerCase())
          || items.Id.toLowerCase().includes(search.toLowerCase())
          || items.NIC.toLowerCase().includes(search.toLowerCase())
      })
    )


  }, [search, staff])



  //This function used to get specific user data
  function getdata(data) {
    setbtnStatus1(false)
    setbtnStatus2(true)
    setStatus(true)
    setSelectStaff(data)
    setID(data.Id)
    setFname(data.fName)
    setLname(data.lName)
    setMobile(data.mobile)
    setNIC(data.NIC)
    setMail(data.mail)
  }




  //This function is used to delete specific user
  function deleteUser() {

    SoloAlert.confirm({

      title: "Confirm Delete",
      body: "Are you sure",
      theme: "dark",
      useTransparency: true,
      onOk: async function () {

        try {
          const result = await (await axios.delete(`http://localhost:5000/DeliveryBoy/remove/${selectStaff._id}`)).status
          console.log(result)

          if (result === 200) {
            SoloAlert.alert({
              title: "Welcome!",
              body: "Deletion is successful",
              icon: "success",
              theme: "dark",
              useTransparency: true,
              onOk: function () {
                window.location = "/viewStaff"
              },

            });
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Oops!",
            body: "Something went wrong",
            icon: "error",
            theme: "dark",
            useTransparency: true,
            onOk: function () {

            },

          });
        }
      },
      onCancel: function () {
        SoloAlert.alert({
          title: "Oops!",
          body: "You canceled delete request",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {

          },

        });
      },

    })
  }




  //This function is used to update user data
  async function updateUser() {
    setLoading(true);
    try {
      const updatedMember = {
        Id,
        fName,
        lName,
        mobile,
        mail,
        NIC
      }

      if (!validation.isEmail(mail)) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please enter valid mail address",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {

          },

        });
      } else {
        const result = await (await axios.put(`http://localhost:5000/DeliveryBoy/update/${selectStaff._id}`, updatedMember)).status;

        if (result === 200) {
          SoloAlert.alert({
            title: "Welcome!",
            body: "User updated successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
            onOk: function () {
              window.location = "/viewStaff"
            },
          });
        }
      }

    } catch (err) {

    }
    setLoading(false);
  }


    //This method will remove disable tag in input fields
  function editeUser() {
    setStatus(false)
    setbtnStatus1(true)
    setbtnStatus2(false)
  }



  //This function used to generate a pdf
  function generatePDF(tickets) {

    const doc = new jspdf();
    const tableColumn = ["User ID", "First Name", "Last Name", "Mail Address", "Mobile Number", "NIC"];
    const tableRows = [];

    tickets.slice(0).reverse().map(ticket => {
      const ticketData = [
        ticket.Id,
        ticket.fName,
        ticket.lName,
        ticket.mail,
        ticket.mobile,
        ticket.NIC,
      ];
      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    doc.text("Delivery-Staff-Report", 14, 15).setFontSize(12);
    doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
    doc.save(`Delivery-Staff-Report_${dateStr}.pdf`);

  }




  return (
    <div className="content ">

      {/* this part used to display page loader */}
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-danger" style={{width: "10rem", height: "10rem",  marginTop:"100px"}} role="status" hidden={loaderStatus}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>{/* End of the loader */}



      {/* This function used to view one user data in pop box */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">User ID - {selectStaff.Id}</h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div class="modal-body">
              <form class="was-validated">
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectStaff.fName} readOnly={status} required
                    onChange={(e) => { setFname(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectStaff.lName} readOnly={status} required
                    onChange={(e) => { setLname(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectStaff.mobile} readOnly={status} required
                    onChange={(e) => { setMobile(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="email" class="form-control" id="floatingInput" defaultValue={selectStaff.mail} readOnly={status} required
                    onChange={(e) => { setMail(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectStaff.NIC} readOnly={status} required
                    onChange={(e) => { setNIC(e.target.value); }} />
                </div>
              </form>
            </div>
            <div class="modal-footer" hidden={btnStatus1}>
              <button type="button" class="btn btn-primary" onClick={(e) => { editeUser() }}><i className="far fa-edit"></i> EDIT</button>
              <button type="button" class="btn btn-danger" onClick={(e) => { deleteUser() }}> <i class="fa fa-trash"></i> DELETE</button>
            </div>

            <div class="modal-footer" hidden={btnStatus2}>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" onClick={(e) => { updateUser() }}
                disabled={isLoading} ><i class="fa fa-wrench"></i>  {isLoading ? 'Updating..' : 'UPDATE'}</button>
            </div>
          </div>
        </div>
      </div>{/* End Of the Pop up box */}



     {/* This part used to get all users data into table */}
    <div hidden={tableStatus}>
      <nav className="navbar bg-white" >
        <div className="container-fluid">
          <h3>VIEW-DELIVERY-BOYS</h3>
          <button type="button" className="btn btn-warning" id="pdfButton" onClick={(e) => { generatePDF(staff) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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

            {filtered.slice(0).reverse().map((Staff) => {
              return <tr>
                <td>{Staff.Id}</td>
                <td> {Staff.fName} </td>
                <td> {Staff.lName} </td>
                <td> {Staff.mail} </td>
                <td> {Staff.mobile} </td>
                <td>{Staff.NIC}</td>
                <td><Link type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" className="Edit" onClick={() => { getdata(Staff) }}> <i className="far fa-edit"></i> </Link></td>
              </tr>

            })}
          </tbody>
        </table>

      </div>
      {/* End of the all users data get part */}
      </div>
    </div>
  )
}
