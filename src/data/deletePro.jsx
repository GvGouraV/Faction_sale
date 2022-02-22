import React, {Component} from "react";
import http from "../services/http";
class DeletePro extends Component{
    
    async componentDidMount(){
        let {id} = this.props.match.params
        let response = await http.deleteApi(`/products/${id}`)
        window.location=("/manageProducts")
    }
    render(){
        return " "
    }
}
export default DeletePro;