import React, {Component} from "react";
import http from "../services/http";
import auth from "../services/authServices";
import Img from "./img";
import { Link } from "react-router-dom";
class Login extends Component{
    state={
        data:{email:"",password:""},
        error:""
    }
    
   async login(url,obj){
    try{
        console.log("yu")
        let response = await http.post(url,obj);
        let {data} = response
        auth.login(data)
        let errors = {};
        this.setState({errors:errors})
        window.location= "/addDetails"
    }
    catch(ex){
        if(ex.response && ex.response.status ===401){
            let errors= ""
            errors= ex.response.data;
            this.setState({error:errors})
        }
    }
}
submit = () =>{
    this.login("/login",this.state.data)
}


 handleChange = (e) =>{
    const { currentTarget: input} = e
    let s1 = {...this.state}
    s1.data[input.name]=input.value 
    this.setState(s1) 
}



showTextField= (lable,name,value,error) =>{
       return (
       <div className="row">
           <div className="col-2"></div>
           <div className="col-2">{lable}<span className="text-danger">*</span> : </div>
           <div className="col-6">
               <div class="form-group">
                  <input
                    type={lable=="Password"?"password":"text"}
                     className="form-control"
                     name={name}
                     value={value}
                     onChange={this.handleChange}
                  />              
                </div>   
           </div>
           <div className="col-2"></div>
       </div>)
   }


    render(){
        let  {data,error} = this.state
     return(<div className="container"><Img/>
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-center">
                <h3 className="text-center">Login</h3>
                {this.showTextField("Email","email",data.email)}
                <span style={{marginLeft:"110px",fontSize:"12px"}}>We'll Never Share your Email with anyone else</span>
                {this.showTextField("Password","password",data.password)}
                <div class="form-group">
                {error?<span className="form-control text-danger" style={{width:"357px",marginLeft:"244px",backgroundColor:"#f0c5c5"}}>{error}</span>:""}<br/>
               </div>
               
                <button className="btn btn-primary" onClick={()=>this.submit()}>Login</button><br/><br/>
                <Link to="/newAcc" className="text-center">Create new Account</Link>
            </div>
            <div className="col-2"></div>
        </div>
     </div>)
    }
}
export default Login;