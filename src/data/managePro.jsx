import React, {Component} from "react";
import http from "../services/http";
import { Link } from "react-router-dom";
class ManagePro extends Component{
    state={
        proData:[],
        serach:""
    }
    
    async componentDidMount(){
        let response = await  http.get("/products")
        let {data} = response
        this.setState({proData:data})
    }

    handleChange = (e) =>{
        const { currentTarget: input} = e
        let s1 = {...this.state}
        s1.serach=input.value 
        this.setState(s1) 
    }

    showTextField= (name,value) =>{
        return ( <div class="form-group">
                   <input
                      type="text"
                      className="form-control"
                      name={name}
                      placeholder="Search..."
                      value={value}
                      onChange={this.handleChange}
                   />              
                </div>)
        }
        addToProduct=()=>{
            window.location=("/addNewProduct")
        }
    
    render(){
        let {proData,serach} = this.state 
         console.log(serach)
        if(serach==""){}
        else{ {proData=proData
            .filter(item => {
           
              if (item.name.includes(serach)||item.category.includes(serach)) {
                  console.log("hy")
                return true
              }
            })
         }}
        return(
        <div className="container"><br/>
            <button className="btn btn-success" onClick={()=>this.addToProduct()}>Add to Product</button><br/>
            <br/>{this.showTextField("search",serach)}<br/>
            <p>Showing products 1-{proData.length}</p>
            <div className="row bg-dark text-light border text-center">
               <div className="col-1">#</div>
               <div className="col-3">Title</div>
               <div className="col-3">Category</div>
               <div className="col-2">Price</div>
               <div className="col-2"></div>
            </div>
            {proData.map(p=>(
                 <div className="row border text-center">
                 <div className="col-1">{p.id}</div>
                 <div className="col-3">{p.name}</div>
                 <div className="col-3">{p.category}</div>
                 <div className="col-2">{p.price}</div>
                 <div className="col-2"><Link to={`products/${p.id}/edit`}>Edit</Link>   <Link to={`products/${p.id}/delete`}>Delete</Link></div>
              </div>
            ))}
        </div>)


    }
}
export default ManagePro;