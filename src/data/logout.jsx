import React, {Component} from "react";
import http from "../services/http";
import auth from "../services/authServices";
class Logout extends Component{
    
    async componentDidMount(){
        auth.logout()
        window.location=("/login")
    }
    render(){
        return " "
    }
}
export default Logout;