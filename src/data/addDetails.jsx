import React, {Component} from "react";
import http from "../services/http";
import auth from "../services/authServices";
import Img from "./img";
class AddDetails extends Component{
     
    state={
        click:0,
        cartData:[],
        address2:"",
        data:{ name:"",
            address:"",
            city: "",
            totalprice: 0,
            items: 0,
            email: ""}
    }
  async componentDidMount(){
      let response = await http.get("/cart")
      let { data }= response
      this.setState({cartData:data})
  }
  
  async postData(url,obj){
      let response = await http.post(url,obj)
      console.log(response)
      this.setState({click:1})
  }

  handleChange = (e) =>{
    const { currentTarget: input} = e
    let s1 = {...this.state}
    if(input.name=="address2"){
        s1.address2=input.value
    }else{
        s1.data[input.name]=input.value
    }
 
    this.setState(s1) 
}
  submitDetails=()=>{
      let s1 = {...this.state}
      let user = auth.getUser()
       s1.data.address=s1.data.address+","+s1.address2
       s1.data.email=user.email
       s1.cartData.map(p=>{
       s1.data.items++
        s1.data.totalprice=s1.data.totalprice+p.quantity*p.price
       })
       this.postData("/orders",s1.data)
  }


showTextField= (lable,name,value) =>{
       return (
       <div >{lable=="Address2"?"":<label>{lable}</label>}
            <div class="form-group">
                  <input
                    type="text"
                     className="form-control"
                     name={name}
                     value={value}
                     placeholder={name=="address"?"line 1":name=="address2"?"line 2":""}
                     onChange={this.handleChange}
                  />              
           </div>
       </div>)
   }

    render(){
       let {cartData,address2,click} = this.state
       let {name,address,city,items,totalprice,email} = this.state.data
       let total=0
       cartData.map(p=>{
           items++
           totalprice=+totalprice+p.quantity*p.price
       })
       if(click==0){
        return(
        <div className="container"><Img/>
        <h3 className="text-center">Summary Your Order</h3><br/>
        <p className="text-center">You order have {items} items</p>
            <div className="row bg-secondary text-dark text-center border">
                <div className="col-4">Name</div>
                <div className="col-4">Quantity</div>
                <div className="col-4">Value</div>
            </div>
                {cartData.map(pro=>(
                    <div className="row text-center border">
                    <div className="col-4">{pro.name}</div>
                    <div className="col-4">{pro.quantity}</div>
                    <div className="col-4">Rs .{pro.quantity*pro.price}</div>
                    </div>
                ))}
                <div className="row text-center border">
                 <div className="col-4">Total</div>
                 <div className="col-4"></div>
                 <div className="col-4">Rs .{totalprice}</div>
                </div><br/>
                <h3  className="text-center">Delivery Details</h3><br/>
                {this.showTextField("Name","name",name)}<br/>
                {this.showTextField("Address","address",address)}
                {this.showTextField("Address2","address2",address2)}<br/>
                {this.showTextField("City","city",city)}<br/>
                <button className="btn btn-success" onClick={()=>this.submitDetails()}>Submit</button>
        </div>)}
        else{
            return(
            <div className="container">
                  <h4 className="text-center">Thank You</h4>
                  <h6 className="text-center">We recieved you order and will process it  within next 24 hours</h6>
            </div>)
        }
    }
}
export default AddDetails;