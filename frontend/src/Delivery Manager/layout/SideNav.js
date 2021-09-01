import React from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';

export default function SideNav() {
    return (

        <div>

            <div class="sidebar">
                <Link to="/addStaff">ADD STAFF</Link>
                <Link to="/viewStaff">VIEW STAFF</Link>
                <Link to="/addVehicle"> ADD VEHICLES</Link>
                <Link to="/viewVehicles"> VIEW VEHICLES</Link>
            </div>


        </div>
    )
}
