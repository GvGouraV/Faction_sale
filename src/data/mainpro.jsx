import React , {Component} from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import NavBar1 from "./navbar1";
import ShowPro from "./showPro";
import CartPro from "./cartPro";
import Login from "./login";
import AddDetails from "./addDetails";
import MyOrders from "./orders";
import ManagePro from "./managePro";
import EditPro from "./editPro";
import AddNewPro from "./addNewPro";
import DeletePro from "./deletePro";
import Logout from "./logout";
import NewAcc from "./newAcc";
class MainPro extends Component{

  render (){
     
        return(<div className="">
              <NavBar1/>
              <Switch>
                    <Route path="/newAcc" component={NewAcc}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/products/:id/delete" component={DeletePro}/>
             <Route path="/addNewProduct" component={AddNewPro}/>
              <Route path="/products/:id/edit" component={EditPro}/>
              <Route path="/myOrder" component={MyOrders}/>
              <Route path="/addNewProduct" component={AddNewPro}/>
              <Route path="/addDetails" component={AddDetails}/>
              <Route path="/login" component={Login}/>
              <Route path="/cart" component={CartPro}/>
              <Route path="/manageProducts" component={ManagePro}/>
              <Route path="/:category" component={ShowPro}/>
              
              <Redirect from="/" to="/All"/>
              </Switch>  
             
        </div>)
       
  }
}
export default MainPro;