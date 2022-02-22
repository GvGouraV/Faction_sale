import React , {Component} from "react";
import http from "../services/http";
class AddNewPro extends Component{
    
    state={
        data:{name:"",category:"",price:0,description:"",imglink:"",imglink2:""}
    }
   
      handleChange = (e) =>{
        const { currentTarget: input} = e
        let s1 = {...this.state}
        s1.data[input.name]= input.value
        this.setState(s1)
    }
      showTextField= (lable,name,value,selVal) =>{
        return (
        <div ><label>{lable}</label>
             <div class="form-group">
                   <input
                     type="text"
                     placeholder={selVal}
                      className="form-control"
                      name={name}
                      value={value}
                      onChange={this.handleChange}
                   />              
            </div>
        </div>)
    }
      showDropDown = (arr,name,value) =>{
        return(
              <select className="form-control" name={name} value={value} onChange={this.handleChange}>
                  <option selected disabled value="">Select the Category</option>
                  {arr.map(st=><option>{st}</option>)}
                    </select>)
      }
      saveData=()=>{
          let s1 = {...this.state}
          this.postData(`/products`,s1.data)
      }
      async postData(url,obj){
          console.log(obj)
          let response = await http.post(url,obj)
          console.log(response)
         window.location=("/manageProducts")
      }


    render(){
        let {name,category,price,description,imglink2,imglink} = this.state.data
        let catyArr=["Watches","Sunglasses","Belts","Handbags","Formal Shoes","Sandals","Sport Shoes","Floaters"]
        return (
        <div className="container">
                      {this.showTextField("Name","name",name,"Enter the name of Product")}<br/>
                      {this.showTextField("Description","description",description,"Enter the product description")}<br/>
                      {this.showTextField("Price","price",price,"Enter the product price")}<br/>
                      {this.showTextField("Image","imglink",imglink,"Drop the ImgLing of Product")}<br/>
                      {this.showTextField("Image","imglink2",imglink2,"Drop the 2 ImgLing of Product")}<br/>
                      <label>Category</label>
                      {this.showDropDown(catyArr,"category",category)}<br/>
                      <button className="btn btn-success" onClick={()=>this.saveData()}>Add</button>
                     
    
        </div>)
    }
}
export default AddNewPro;