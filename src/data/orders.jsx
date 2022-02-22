import React,{Component} from "react";
import http from "../services/http";
import Img from "./img";
class MyOrders extends Component{
   
    state={orderData:[]}
 
   async componentDidMount(){
       let response = await http.get("/orders")
       let {data} = response
       this.setState({orderData:data})
   }
 
 
    render(){
        let {orderData} = this.state
        console.log(orderData)
       return(
       <div className="container"><Img/>
           <h4>List of Orders</h4>
             <div className="row bg-dark text-light border text-center">
                <div className="col-2">Name</div>
                <div className="col-2">City</div>
                <div className="col-3">Address</div>
                <div className="col-2">Amount</div>
                <div className="col-2">Items</div>
             </div>
             {orderData.map(p=>(
                  <div className="row border text-center">
                  <div className="col-2">{p.name}</div>
                  <div className="col-2">{p.city}</div>
                  <div className="col-3">{p.address}</div>
                  <div className="col-2">Rs .{p.items}</div>
                  <div className="col-2">{p.totalprice}</div>
               </div>
             ))}
       </div>)

    }
}
export default MyOrders;