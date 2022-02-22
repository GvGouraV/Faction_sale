import React, {Component} from "react";
import http from "../services/http";
import Img from "./img";
class NewAcc extends Component{
    
    state={
        data:{name:"",email:"",password:""},
        errors:{},
        conPass:""
    }

    submit = () =>{
        let s1 = {...this.state}
           this.postData("/newAcc",s1.data)
    }
    async postData(url,obj){
        let response = await http.post(url,obj)
        console.log(response)
        window.location=("/login")
    }
    
    
     handleChange = (e) =>{
        const { currentTarget: input} = e
        let s1 = {...this.state}
        if(input.name=="conPass"){
            s1.conPass=input.value
        }else{
            s1.data[input.name]=input.value 
        }      
        this.setState(s1) 
    }
  
  
    
    
    
    
    
    showTextField= (lable,name,value,selval) =>{
           return (
           <div className="row">
               <div className="col-4"></div>
               <div className="col-2">{lable}<span className="text-danger">*</span> : </div>
               <div className="col-4">
                   <div class="form-group">
                      <input
                        type={lable=="Password"?"password":"text"}
                         className="form-control"
                         name={name}
                         value={value}
                         placeholder={selval}
                         onChange={this.handleChange}
                      />              
                    </div>   
               </div>
               <div className="col-2"></div>
           </div>)
       }
    
    render(){
        let {name,email,password}=- this.state.data
        let {conPass} = this.state
        return (
        <div className="container text-center"><Img/>
            <h3 className="text-center">Create New Login</h3>
            {this.showTextField("Name","name",name,"Enter the Name")}<br/>
            {this.showTextField("Email","email",email,"Enter your valid email")}<br/>
            
            {this.showTextField("Password","password",password,"Enter password")}<br/>
         
            {this.showTextField("Confirm Password","conPass",conPass,"Re-Enter password")}<br/>
            
            <div className="text-center">
            <button className="btn btn-primary" onClick={()=>this.submit()}>Create</button>
            </div>
            
        </div>)
    }
}
export default NewAcc;