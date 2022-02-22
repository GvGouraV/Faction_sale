import React,{Component} from "react";
import http from "../services/http";
import auth from "../services/authServices";
import Img from "./img";
class CartPro extends Component{
     
    state={
        cartData:[],click:-1
    }
     
    async fetchData(){
        let response = await http.get("/cart")
        let {data} = response
        this.setState({cartData:data})
    }
    componentDidMount() {
        this.fetchData();
      }
    
      componentDidUpdate(prevProps, prevState) {
        
        if (prevProps !== this.props) this.fetchData();
      }
     async putData(url,obj){
         console.log(url,obj)
         let response = await http.put(url,obj)
         console.log(response)
         this.fetchData();
     }

   addQuantity=(id,quty)=>{
       let s1 = {...this.state}
       let find = s1.cartData.find(ct=>ct.id==id)
       find.quantity++
       this.putData(`/cart/${find.id}`,find)
   }

   subQuantity=(id,quty)=>{
    let s1 = {...this.state}
    let find = s1.cartData.find(ct=>ct.id==id)
    find.quantity--
    this.putData(`/cart/${find.id}`,find)
}
 checkOut=()=>{
     let user = auth.getUser()
     if(user){
         window.location=("/addDetails")
     }else{
        window.location=("/login")   
     }
 }  
 changeimg=(val)=>{
    let s1 = {...this.state}
   
        s1.click=val
   
    this.setState(s1)     
}

    render(){
        let {cartData,click} = this.state
         let value = 0
         let tot=0
         cartData.map(pro=>{
            value=value+pro.price*pro.quantity
            tot=tot+pro.quantity
         })
        
        return(
        <div className="container"> <Img/>
        <h3  className="text-center">You have {tot} items in Your Cart</h3>
        <div className="row">
           <div className="col-2">
             <span>Cart Value - Rs : {value}</span>
           </div>
           <div className="col-8"></div>
           <div className="col-2"><button className="btn btn-primary" onClick={()=>this.checkOut()}>Check Out</button></div>
        </div><br/>
        
           <div className="row bg-dark text-light ">
              <div className="col-9 text-center">Products Details</div>
              <div className="col-1">Quantity</div>
              <div className="col-2 text-center">Price</div>
           </div>
           {cartData.map((ct,index)=>(
               <div className="row mt-3 border" key={ct.id}>
                   <div className="col-2"><img src={click!=index?ct.imglink:ct.imglink2} width="90px" height="80px" style={{borderRadius:"20px"}} onMouseOver={()=>this.changeimg(index)}></img></div>
                   <div className="col-7">{ct.name}<br/>{ct.category}<br/>{ct.description}</div>
                   <div className="col-1">
                        <div className="row mt-3">
                            <div className="col-4"><button className="btn btn-success btn-sm" onClick={()=>this.addQuantity(ct.id,ct.quantity)}>+</button></div>
                            <div className="col-2 mt-1 text-center">{ct.quantity}</div>
                            <div className="col-4"><button className="btn btn-warning btn-sm"onClick={()=>this.subQuantity(ct.id,ct.quantity)}>-</button></div>
                    </div></div>
                    <div className="col-2 text-center mt-4">Rs.{ct.price}</div>
               </div>
           ))}
          

        </div>)

    }
}
export default CartPro;