import React , {Component} from "react";
import http from "../services/http";
class EditPro extends Component{
    
    state={
        data:{},click:1,proId:''
    }
   
     async fetchData(){
         let {id}  = this.props.match.params
         console.log(id)
         let response = await http.get(`/product/${id}`)
         let { data } = response
         console.log(data)
         let proid= data.id
         let json = {name:data.name,category:data.category,description:data.description,price:data.price,imglink:data.imglink,imglink2:data.imglink2}
         this.setState({data:data,proId:proid})
     }
     componentDidMount() {
        this.fetchData();
      }  
      componentDidUpdate(prevProps, prevState) {
        
        if (prevProps !== this.props) this.fetchData();
      }
      handleChange = (e) =>{
        const { currentTarget: input} = e
        let s1 = {...this.state}
        s1.data[input.name]= input.value
        this.setState(s1)
    }
      showTextField= (lable,name,value) =>{
        return (
        <div ><label>{lable}</label>
             <div class="form-group">
                   <input
                     type="text"
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
          this.putData(`/product/${s1.proId}`,s1.data)
      }
      async putData(url,obj){
        console.log(url)
          let response = await http.put(url,obj)
          console.log(response)
          window.location=("/manageProducts")
      }
      deleteData=(id)=>{
         this.props.history.push(`/products/${id}/delete`)
      }
      changeimg=(val)=>{
        let s1 = {...this.state}
        console.log(val)
       if(val==1){
        s1.click=0
       }else{
        s1.click=1
       }
            
       
        this.setState(s1)     
    }


    render(){
        let {name,category,price,id,description,imglink,imglink2} = this.state.data
        let {click} = this.state
        let catyArr=["Watches","Sunglasses","Belts","Handbags","Formal Shoes","Sandals","Sport Shoes","Floaters"]
        return (
        <div className="container">
             <h2 className="text-center">Edit Product</h2>
             <div className="row">
                 <div className="col-5">
                     <div className="bg-dark text-light border">
                     <img src={click==1?imglink:imglink2} width="405px" hight="450px" className="mx-4 mt-3" onMouseLeave={()=>this.changeimg(click)}></img>
                     <h5  className="mx-5 mt-4">{name}</h5>
                     <p  className="mx-5 ">category : {category}</p>
                     <p  className="mx-5 ">Price : Rs . {price}</p>
                     </div>                   
                 </div>
                 <div className="col-7">
                      {this.showTextField("Name","name",name)}<br/>
                      {this.showTextField("Description","description",description)}<br/>
                      {this.showTextField("Price","price",price)}<br/>
                      {this.showTextField("Image","imglink",imglink)}<br/>
                      {this.showTextField("Image 2","imglink2",imglink2)}<br/>
                      <label>Category</label>
                      {this.showDropDown(catyArr,"category",category)}<br/>
                      <button className="btn btn-primary" onClick={()=>this.saveData()}>Save</button>
                      <button className="btn btn-secondary mx-3" onClick={()=>this.deleteData(id)}>Delete</button>
                 </div>
                  
             </div>
        </div>)
    }
}
export default EditPro;