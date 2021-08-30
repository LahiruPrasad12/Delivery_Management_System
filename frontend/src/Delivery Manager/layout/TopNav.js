import React from 'react'
import "./TopNav.css"

export default function TopNav() {
    return (
        <div>
<nav>
      <input type="checkbox" id="check"/>
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">ESTILO DESIGNER WEARS</label>
      <ul>
        <li><a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#"><i class="fa fa-fw fa-wrench"></i> Services</a></li>
        <li><a href="#"><i class="fa fa-fw fa-envelope"></i>Contact</a></li>
        <li><a href="#"><i class="fa fa-fw fa-user"></i>Feedback</a></li>
      </ul>
    </nav>


        </div>


         

              



            )
}
