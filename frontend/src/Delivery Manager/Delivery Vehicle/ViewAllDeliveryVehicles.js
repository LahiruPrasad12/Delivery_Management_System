import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import jspdf from 'jspdf'
import "jspdf-autotable"
import validation from 'validator'
import SoloAlert from 'soloalert'


export default function ViewAllDeliveryVehicles() {

  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);

  const [vehicle, setvehicle] = useState([]);
  const [selectVehicle, setSelectVehicle] = useState([]);
  const [status, setStatus] = useState(true);
  const [btnStatus1, setbtnStatus1] = useState(false)
  const [btnStatus2, setbtnStatus2] = useState(true)

  const [loaderStatus, setLoaderStatus] = useState(false);
  const [tableStatus, setTablestatus] = useState(true);


  const [vehicle_number, setvehicle_number] = useState("");
  const [owner_name, setowner_name] = useState("");
  const [owner_contactNumber, setowner_contactNumber] = useState("");
  const [owner_NIC, setowner_NIC] = useState("");
  const [owner_mail, setowner_mail] = useState("");
  const [isLoading, setLoading] = useState(false);



  //This useEffect function used to get all user's data
  useEffect(() => {
    async function getvehicle() {
      try {
        const result = await (await axios.get("http://localhost:5000/vehicle/view")).data.data
        setvehicle(result);
        setTablestatus(false)
        setLoaderStatus(true)
      } catch (err) {
      }
    }
    getvehicle();
  })


  //This useEffect method is used to perform a searching function
  useEffect(() => {
    setfiltered(
      vehicle.filter(items => {
        return items.vehicle_number.toLowerCase().includes(search.toLowerCase())
          || items.owner_name.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, vehicle])



  //This function used to get specific user data
  function getOneVehicleData(data) {
    setbtnStatus1(false)
    setbtnStatus2(true)
    setStatus(true)
    setSelectVehicle(data)
    setvehicle_number(data.vehicle_number)
    setowner_name(data.owner_name)
    setowner_contactNumber(data.owner_contactNumber)
    setowner_NIC(data.owner_NIC)
    setowner_mail(data.owner_mail)
  }



  //This method will remove disable tag in input fields
  function editVehicle() {
    setStatus(false)
    setbtnStatus1(true)
    setbtnStatus2(false)
  }




  function deleteVehicle() {
    
    SoloAlert.confirm({

      title: "Confirm Delete",
      body: "Are you sure",
      theme: "dark",
      useTransparency: true,
      onOk: async function () {

        try {
          const result = await (await axios.delete(`http://localhost:5000/vehicle/remove/${selectVehicle._id}`)).status
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




  //This function used to update vehicle details
 async function updateVehicle() {
    setLoading(true);
    try {
      const updatedVehicle = {
        vehicle_number, owner_name, owner_contactNumber, owner_NIC ,owner_mail
      }

      if (!validation.isEmail(owner_mail)) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please enter valid mail address",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {

          },

        });
      }else if(owner_contactNumber.length !== 10 ){
        SoloAlert.alert({
          title: "Oops!",
          body: "Please enter valid phone number",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {         
          },     
        });
      }
      
      else {
        const result = await (await axios.put(`http://localhost:5000/vehicle/update/${selectVehicle._id}`, updatedVehicle)).status;

        if (result === 200) {
          SoloAlert.alert({
            title: "Welcome!",
            body: "Vehicle updated successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
            onOk: function () {
              window.location = "/viewVehicles"
            },
          });
        }
      }

    } catch (err) {
      SoloAlert.alert({
        title: "Oops!",
        body: "Please enter valid phone number",
        icon: "warning",
        theme: "dark",
        useTransparency: true,
        onOk: function () {         
        },     
      });

    }
    setLoading(false);
  }//End of update method






  //This function used to generate a pdf
  function generatePDF(tickets) {

    const doc = new jspdf();
    const tableColumn = ["Vehicle Number", "Owner Name", "Owner Mobile", "Owner Mail", "Owner NIC"];
    const tableRows = [];

    tickets.slice(0).reverse().map(ticket => {
      const ticketData = [
        ticket.vehicle_number,
        ticket.owner_name,
        ticket.owner_contactNumber,
        ticket.owner_mail,
        ticket.owner_NIC,
      ];
      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    doc.text("Delivery-Vehicle-Report", 14, 15).setFontSize(12);
    doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
    doc.save(`Delivery-Vehicle-Report_${dateStr}.pdf`);

  }

  return (
    <div className="content ">


      {/* this part used to display page loader */}
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-danger" style={{ width: "10rem", height: "10rem", marginTop: "100px" }} role="status" hidden={loaderStatus}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>{/* End of the loader */}






      {/* This function used to view one user data in pop box */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Vehicle Number - {selectVehicle.vehicle_number}</h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div class="modal-body">
              <form class="was-validated">
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectVehicle.owner_name} readOnly={status} required
                    onChange={(e) => { setowner_name(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectVehicle.owner_contactNumber} readOnly={status} required
                    onChange={(e) => { setowner_contactNumber(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="email" class="form-control" id="floatingInput" defaultValue={selectVehicle.owner_mail} readOnly={status} required
                    onChange={(e) => { setowner_mail(e.target.value); }} />
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" id="floatingInput" defaultValue={selectVehicle.owner_NIC} readOnly={status} required
                    onChange={(e) => { setowner_NIC(e.target.value); }} />
                </div>
              </form>
            </div>
            <div class="modal-footer" hidden={btnStatus1}>
              <button type="button" class="btn btn-primary" onClick={(e) => { editVehicle() }}><i className="far fa-edit"></i> EDIT</button>
              <button type="button" class="btn btn-danger" onClick={(e) => { deleteVehicle() }}> <i class="fa fa-trash"></i> DELETE</button>
            </div>

            <div class="modal-footer" hidden={btnStatus2}>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" onClick={(e) => { updateVehicle() }}
                disabled={isLoading} ><i class="fa fa-wrench"></i>  {isLoading ? 'Updating..' : 'UPDATE'}</button>
            </div>
          </div>
        </div>
      </div>{/* End Of the Pop up box */}




      {/* This part used to get all users data into table */}
      <div hidden={tableStatus}>
        <nav className="navbar bg-white">
          <div className="container-fluid">
            <h3>VIEW-DELIVERY-VEHICLES</h3>
            <button type="button" className="btn btn-warning" id="pdfButton" onClick={(e) => { generatePDF(vehicle) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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

              {filtered.slice(0).reverse().map((vehicle) => {
                return <tr>
                  <td>{vehicle.vehicle_number}</td>
                  <td> {vehicle.owner_name} </td>
                  <td> {vehicle.owner_contactNumber} </td>
                  <td> {vehicle.owner_NIC} </td>
                  <td> {vehicle.owner_mail} </td>
                  <td><Link type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" className="Edit" onClick={() => { getOneVehicleData(vehicle) }}> <i className="far fa-edit"></i> </Link></td>
                </tr>

              })}
            </tbody>
          </table>

        </div>

      </div>{/* End of the all users data get part */}

    </div>

  )
}
