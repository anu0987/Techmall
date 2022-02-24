const { response } = require('express')
const express = require('express')
const path = require('path')

const categoryModel = require('../models/CategoryModel')
const productModel = require('../models/ProductModel')

const route = express.Router()

route.post("/removecartitem",(request,response)=>
{
    console.log(request.body);
    var arr = request.session.cart
    var x=0;
    while (x<arr.length)
    {
        if(arr[x].product==request.body.pid)
        {
            arr.splice(x,1);
            break;
        }
        x++;
    }
    
    request.session.cart = arr
    response.send(request.session.cart)
})

route.post("/getproduct",(request,response)=>
{ 
    productModel.getProduct(request.body.pid,(record)=>
    {
        response.send(record)
    })   
})

route.get("/loadcart",(request,response)=>
{
    console.log(request.session.cart)
    response.send(request.session.cart)
})

route.post("/addcart",(request,response)=>
{
    var pid = request.body.pid;
    var ob = {
        product:pid,
        quantity:1
    }

    if(request.session.cart==undefined)
    {
        request.session.cart = [ob];
    }else{
        var arr = request.session.cart
        arr.push(ob);
        request.session.cart = arr;
    }
    response.send({status:true})
})

route.get('/login',(request,response)=>
{
    console.log(">>>> " , request.query)
    var email = request.query.email
    var pwd = request.query.pwd
    // console.log(">>>> " , request.body)
    if(email=="admin@techmall.com" && pwd=='123')
    {
      request.session.user = {
        type:'admin',
        email:email
      }
      response.send({status:true,msg:"Login Success !"})
    }
    else
      response.send({status:false,msg:"Login Failed !"})
})


route.all('/category',(request,response)=>
{
    if(request.method=="GET")
    {
        categoryModel.listCategory((records)=>
        {
            response.send(records)
        })        
    }else // POST
    {        
        categoryModel.saveCategory(request.body,(result)=>
        {
            response.send({status:result})
        })
    }
})

route.all('/product',(request,response)=>
{
    if(request.method=="GET")
    {
        productModel.listProduct((product_records)=>
        {
            response.send(product_records)        
        })       
    }else
    {        
        productModel.saveProduct(request.body,(result)=>
        {
            response.send({status:result})
        })
    }
})

route.post('/searchproduct',(request,response)=>
{
    productModel.searchProduct(request.body.cid,(result)=>
    {
        response.send(result)
    })
})

route.post("/uploadpic",(request,response)=>
{
    //console.log(request.body)
    //console.log(request.files)
    var uploadFile = request.files.product_image
    var filename = Date.now() + path.extname(uploadFile.name);

    uploadFile.mv(path.join(__dirname,"../../build/assets/productpic",filename))
    uploadFile.mv(path.join(__dirname,"../../public/assets/productpic",filename))

    productModel.uploadImage(request.body.pid,filename,(result)=>
    {
        response.send({status:result,filename:filename})
    })
})



module.exports = route