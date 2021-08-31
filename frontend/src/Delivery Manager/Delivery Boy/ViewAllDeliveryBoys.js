import React from 'react'

export default function ViewAllDeliveryBoys() {
    return (
        <div class="content ">

            <nav class="navbar bg-white">
                <div class="container-fluid">
                    <h3>VIEW-DELIVERY-BOYS</h3>
                    <button type="button" class="btn btn-warning" id="pdfButton"><i class="fa fa-file-pdf"></i>  PDF</button>
                    <form class="d-flex">

                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

                    </form>
                </div>

            </nav><hr />


            <div className="bodyContent">
                <table class="table table-dark table-hover">

                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Last</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td><i class="bi bi-file-earmark-pdf-fill"></i></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    )
}
