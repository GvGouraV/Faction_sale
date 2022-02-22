let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Listening on port ${port} !`));
///data base///////
const { Client } = require("pg");
const client = new Client(
    {user: "wedxluiquwtlpa",
    password: "d99a559a5482b6716f0a8fd6a61977e077298bab6431c84fb1e690a2f7220dc8",
    database: "d7c91fbk7vml9p",
    port: 5432,
    host: "ec2-34-227-120-94.compute-1.amazonaws.com",
    ssl: { rejectUnauthorized: false },
});
client.connect(function (res, error) {
    console.log(`Connected!!!`);});
///connectesd////////
const cart=[]
////////////////////////Post Data/////////////////////
app.post("/newAcc", function(req,res){
  console.log("Inside post of user");
  var values = Object.values(req.body);   
      console.log(values)
      const query = `INSERT INTO users(name,email,password)VALUES ($1,$2,$3)`;
      client.query(query, values, function (err, result) {
          if (err) {
              res.status(400).send(err);
          }
          console.log("result=",result);
          res.send(` ${values}  insertion successful`);
         
      });
})
app.post("/products",function(req,res){
  console.log("Inside post of user");
  let name = req.body.name;
  let imglink = req.body.imglink;
  let imglink2 = req.body.imglink2;
  let category = req.body.category;
  let price = +req.body.price
  let description = req.body.description;
  let values = [ category , description,imglink,name,price,imglink2]
  console.log(values)
      const query = `INSERT INTO productData(category ,description , imglink , name , price ,imglink2 )VALUES ($1,$2,$3,$4,$5,$6)`;
      client.query(query, values, function (err, result) {
          if (err) {
              res.status(400).send(err);
          }
          console.log("result=",result);
          res.send(` ${values}  insertion successful`);         
      });
})
app.post("/login", function(req, res) {
  //find that customer
  console.log(req.body);
  const query = ` SELECT * FROM users`;
  client.query(query, function (err, result) {
      if (err) { 
          console.log("err",err)   
          res.status(400).send(err);
      }       
       let users = result.rows
       let custObj = users.find(
        item => item.email === req.body.email && item.password === req.body.password
      );    
      console.log(custObj);
      let resObj = null;
      if (custObj != undefined) {
        resObj = {
          name: custObj.name,
          email: custObj.email,        
        };   
        res.status(200).send(resObj);
      } else res.status(401).send("! Invlid  Email or Password");
      });
});
app.post("/orders",function(req,res){
  console.log("Inside post of user");
  var values = Object.values(req.body);
      console.log(values)
      const query = `INSERT INTO orders(  name ,address , city ,items , totalprice , email  )VALUES ($1,$2,$3,$4,$5,$6)`;
      client.query(query, values, function (err, result) {
          if (err) {
              res.status(400).send(err);
          }
          console.log("result=",result);
          res.send(` ${values}  insertion successful`);
         
      });
 
  });
app.post("/cart",function(req,res){
    let body = req.body;
    cart.push(body);
    res.send(body);
  }) 
//////////////////////////////////////////////////////
/////////////////////////Get/////////////////////////
app.get("/products", function(req,res){
   
  const query = ` SELECT * FROM productData`;
      client.query(query, function (err, result) {
          if (err) { 
              console.log("err",err)   
              res.status(400).send(err);
          }       
          
          res.send(result.rows);              
          });
   
})
app.get("/orders",function(req,res){
    
  const query = ` SELECT * FROM orders`;
      client.query(query, function (err, result) {
          if (err) { 
              console.log("err",err)   
              res.status(400).send(err);
          }       
          
          res.send(result.rows);              
          });
})  
app.get("/cart",function(req,res){
  res.send(cart)
})
app.get("/products/:category", function(req,res){
  let category  = req.params.category
  const query = ` SELECT * FROM productData`;
          client.query(query, function (err, result) {
              if (err) { 
                  res.status(400).send(err);
              }
              let arr = result.rows.filter(pro=>pro.category==category)
              res.send(arr)  
               
              });
})
app.get("/product/:id",function(req,res){
let id  = req.params.id
const query = ` SELECT * FROM productData`;
client.query(query, function (err, result) {
    if (err) { 
        res.status(400).send(err);
    }
    let arr = result.rows.find(pro=>pro.id==id)
    res.send(arr)  
     
    });
})
/////////////////////////////////////////////////////
////////////////////////Delete//////////////////////////
app.delete("/cart/:id", function (req, res) {
  let id = req.params.id;
  let index = cart.findIndex(cr=>cr.id==id)
  console.log(index)
  if(index>=0){
  let deletePro = cart.splice(index,1) 
  res.send(deletePro);}
  else{
      res.status(404).send("Product Not Found")
  }
});
app.delete("/products/:id", function (req, res) {
  let id = +req.params.id;
  let values  =[id]

  const query = `DELETE FROM productData WHERE id=$1;`;
  client.query(query, values, function (err, result) {
      if (err) {
          res.status(400).send(err);
      }
      res.send(`Delete successful`);
  });
});
//////////////////////////////////////////////////////
///////////////////////Put//////////////////////////
app.put("/product/:id", function (req, res, next) {
  console.log("Inside put of user");
  let id = +req.params.id;
  let name = req.body.name;
  let imglink = req.body.imglink;
  let imglink2 = req.body.imglink2;
  let category = req.body.category;
  let price = req.body.price
  let description = req.body.description;
  let values = [ category , description,imglink,name,price,imglink2,id]
   console.log(values)
  const query = `UPDATE productData SET category=$1,description=$2 ,imglink=$3,name=$4,price=$5 ,imglink2=$6 WHERE id=$7`;
  client.query(query, values, function (err, result) {
      if (err) {
          res.status(400).send(err);
      }
      res.send(`updation successful`);
  });
})
app.put("/cart/:id",function(req,res){
  let id = req.params.id
  let body = req.body
  let index = cart.findIndex(cr=>cr.id==id)
  console.log(index)
  if(index>=0){
    let updateCart = {id:id , ...body}
     cart[index] = updateCart
     let find = cart.find(ct=>ct.id==id)
       if(find.quantity<=0){
         cart.splice(index,1)
         let updateCart = {id:id , ...body}
         res.send(updateCart);
       }else{
        res.send(updateCart);
       }
  }else{
      res.status(404).send("Product Not Found")
  }
})
/////////////////////////////////////////////////////  
