

import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Delivery Manager/Home'
import Test from './Delivery Manager/Test1'
import Topnav from './Delivery Manager/layout/TopNav'
import Sidenav from './Delivery Manager/layout/SideNav'
import AddDeleiveryBoy from './Delivery Manager/Delivery Boy/AddDeliveryBoy'
import ViewDeleiveryBoy from './Delivery Manager/Delivery Boy/ViewAllDeliveryBoys'


function App() {
  return (
    <BrowserRouter>
         <Route path = "/"><Topnav/><Sidenav/></Route>
         
        <Route exact path = "/"><Home/></Route>
        <Route exact path = "/addStaff"><AddDeleiveryBoy/></Route>
        <Route exact path = "/viewStaff"><ViewDeleiveryBoy/></Route>
        <Route exact path = "/t"><Test/></Route>
    </BrowserRouter>
  );
}

export default App;
