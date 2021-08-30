

import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Delivery Manager/Home'
import Test from './Delivery Manager/Test1'
import Topnav from './Delivery Manager/layout/TopNav'
import Sidenav from './Delivery Manager/layout/SideNav'
import AddDeleiveryBoy from './Delivery Manager/Delivery Boy/AddDeliveryBoy'

function App() {
  return (
    <BrowserRouter>
        <Route exact path = "/"><Topnav/><Sidenav/><Home/></Route>
        <Route exact path = "/delivery"><Topnav/><Sidenav/><AddDeleiveryBoy/></Route>
        <Route exact path = "/t"><Test/></Route>
    </BrowserRouter>
  );
}

export default App;
