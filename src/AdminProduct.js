import React from 'react'
import {ADMIN_CATEGORY, ADMIN_PRODUCT , PRODUCT_UPLOAD_PIC} from '../serverUrls'

import axios from 'axios';

export default class AdminProduct extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            categorylist:[],
            prodlist:[],
            selectedFile : ''
        }

        this.loadCategory()
        this.loadProduct();
    }

    loadCategory = ()=>{
        fetch(ADMIN_CATEGORY).then(response=>response.json()).then(records=>
        {          
            console.log(records)
            this.setState({categorylist:records})
        });
    }

    loadProduct = ()=>{
        fetch(ADMIN_PRODUCT).then(response=>response.json()).then(records=>
        {          
            console.log(records)
            this.setState({prodlist:records})
        });
    }

    save = ()=>{
        var title = this.ptitleBox.value;
        var price = this.priceBox.value;
        var cate = this.cateBox.value;

        fetch(ADMIN_PRODUCT,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({title:title,price:price,category:cate})
            }).then(response=>response.json()).then(data=>{
                if(data.status)
                {
                    this.setState({msg:'Product Saved !'})   
                    this.loadProduct();                 
                }
                else
                    this.setState({msg:'Product Failed !'})                    
            })
    }

    upload = (event)=>
    {
        var pid = event.target.getAttribute('data-id');   
        var index = event.target.getAttribute('data-index');   
        
        const formData = new FormData();
        formData.append(
          "product_image",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        formData.append('pid',pid)
        axios.post(PRODUCT_UPLOAD_PIC, formData)
        .then(response=>{            
            var result = response.data
            if(result.status){                
                var plist = this.state.prodlist
                plist[index].pic = result.filename
                this.setState({prodlist:plist})
            }
        });
    }

    onFileChange = event => {    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    render(){
        return <div>
             <div class="contact">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8 offset-md-2">
                             <div class="title">
                                 <h2>TechMall<strong class="black">&nbsp;Product</strong></h2> 
                             </div>
                             <hr/>                             
                         </div>
                     </div>

                     <div class="row">
                        <div class='col-lg-4 col-md-4 col-sm-4'>
                            <input type="text" ref={c=>this.ptitleBox=c}class='form-control' placeholder="Product Title"/>
                        </div>                         
                        <div class='col-lg-4 col-md-4 col-sm-4'>
                            <input type="text" ref={c=>this.priceBox=c}class='form-control' placeholder="Product Price"/>
                        </div>                         
                        <div class='col-lg-4 col-md-4 col-sm-4'>
                            <select ref={c=>this.cateBox=c} class='form-control'>
                                {this.state.categorylist.map(record=>{
                                    return <option value={record._id}>
                                        {record.title}
                                    </option>
                                })}
                            </select>
                        </div>        
                    </div>           
                    <br/>          
                    <div class="row">
                        <div class='col-lg-4 col-md-4 col-sm-4'>
                            <button class='btn btn-info' onClick={this.save}>Add Product</button>    
                            &nbsp;
                            <b class='text-danger'>{this.state.msg}</b>
                        </div>                         
                        <div class='col-lg-1 col-md-1 col-sm-1'></div>                         
                     </div>
                     <hr/>        

                     <table class='table'>
                            <tr>
                                <th>S. No.</th>
                                <th>Image</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Upload Image</th>
                            </tr>  

                            {this.state.prodlist.map((rec,index)=>{
                                return <tr>
                                    <th>{index+1}</th>
                                    <th>
                                    <img height="150px" width="160px"
                                    src={"assets/productpic/"+rec.pic}/>
                                    </th>
                                    <th>{rec.title}</th>
                                    <th>{rec.price}</th>
                                    <th>
                                    <input type="file" onChange={this.onFileChange} class='form-control'/>
                                    <br/>
                                    <button class='btn btn-info' 
                                    onClick={this.upload}
                                    data-index={index}
                                    data-id={rec._id}>
                                        Upload</button>    

                                    </th>
                                </tr>
                            })}                         
                     </table>
                </div>
            </div>
        </div>
    }
}