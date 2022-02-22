import React ,{Component} from "react"
import Img from "./img"
import http from "../services/http"

class ShowPro extends Component{

    state={
        dataArr:[],
        click:-1,
        cart:{},
         labelArr:["All","Sunglasses","Watches","Belts","Handbags","Wallets","Formal Shoes","Sport Shoes","Floaters","Sandals"]
    }

    async fetchData(){
        let {category} = this.props.match.params
        let response = null
        if(category=="All")
         response =await http.get("/products")
        else
        response =await http.get(`/products/${category}`)
        let response1 = await http.get("/cart")
        let { data } = response

        this.setState({dataArr:data,cart:response1})
    }
    componentDidMount() {
        this.fetchData();
      }  
      componentDidUpdate(prevProps, prevState) {
        
        if (prevProps !== this.props) this.fetchData();
      }
    addtoCart=(id)=>{
        let {pathname} = this.props.location
        let s1 = {...this.state}
        let obj = s1.dataArr.find(pro=>pro.id==id)
        obj.quantity=1
        this.postData("/cart",obj)
    }
    removetoCart=(id)=>{

        this.deleteData(`/cart/${id}`)
    }
    async postData(url,obj){

        let response = await http.post(url,obj)
        this.fetchData();
    }
    async deleteData(url){
        let {pathname} = this.props.location
        let response = await http.deleteApi(url)
        console.log(response)
        this.fetchData();
    }
    async putData(url,obj){
        console.log(url,obj)
        let response = await http.put(url,obj)
        console.log(response)
        this.fetchData();
    }
    addQuantity=(id)=>{
        let s1 = {...this.state}
        let {data} = s1.cart
        let find = data.find(ct=>ct.id==id)
        find.quantity++
        this.putData(`/cart/${find.id}`,find)
    }
 
    subQuantity=(id)=>{
     let s1 = {...this.state}
     let {data} = s1.cart
     let find = data.find(ct=>ct.id==id)
     find.quantity--
     this.putData(`/cart/${find.id}`,find)
    }

    changePath=(op)=>{
        window.location=(`/${op}`)
    }
    changeimg=(val)=>{
        let s1 = {...this.state}
       
            s1.click=val
       
        this.setState(s1)     
    }
    render(){
        let {labelArr,dataArr,cart,click} = this.state
        let {data=[]}=cart
        console.log(data)
        return(
        <div className="container"><Img/>
            <div className="row">
                <div className="col-3">
                      {labelArr.map(op=>(
                          <div className="border " onClick={()=>this.changePath(op)} style={{height:"40px"}} >
                              <label className="mt-2 mx-4" >{op}</label>
                          </div>
                      ))}
                </div>
                <div className="col-9">
                     <div className="row">
                   
                            {dataArr.map((pro,index)=>(
                             <div className="col-4 mt-4">
                                     <img src={click!=index?pro.imglink:pro.imglink2} width="250px" height="150px" onMouseOver={()=>this.changeimg(index)}></img><br/><br/>
                                     <h5 className="mx-3">{pro.name}</h5>
                                     <span className="mx-3">Rs : {pro.price}</span><br/>
                                     <p className="mx-3" style={{overflow:"hidden",whiteSpace:"nowrap"}}>{pro.description}</p>
                                     {data.find(ct=>
                                       ct.id==pro.id)
                                       ?<div className="row mt-3">
                                           <div className="col-4"></div>
                                       <div className="col-1"><button className="btn btn-success btn-sm" onClick={()=>this.addQuantity(pro.id)}>+</button></div>
                                       <div className="col-1 mx-2 mt-1 text-center"><span className=" mx-2 mt-1 text-center">{data.find(ct=>ct.id==pro.id).quantity}</span></div>
                                       <div className="col-1"><button className="btn btn-warning btn-sm"onClick={()=>this.subQuantity(pro.id)}>-</button></div>
                                       <div className="col-4"></div>
                                       </div>
                                       :<button className=" form-control btn btn-success btn-sm" onClick={()=>this.addtoCart(pro.id)}>Add to Cart</button>                                      
                           }     
                             </div>
                               
                            ))}
                     
                     </div>
                </div>
            </div>
        </div>)

    }
} 
export default ShowPro;