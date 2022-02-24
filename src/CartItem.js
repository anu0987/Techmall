import React from 'react';
import { LOAD_PRODUCT } from '../serverUrls';

export default class CartItem extends React.Component 
{
    constructor(props) {
        super(props)
        this.state = {           
            pinfo:{}
        }  
        this.loadProduct()

        console.log(this.props)
    }

    loadProduct = ()=>
    {
        fetch(LOAD_PRODUCT,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({pid:this.props.prodinfo.product})
            }).then(response=>response.json()).then(response=>{
                if(response)
                {
                    this.setState({pinfo:response})                    
                }
            })
    }

    removeitem = ()=>
    {
       this.props.delitem(this.state.pinfo._id);
    }

    render(){
        return <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div class="img_box">
                                <figure><img src={"assets/productpic/"+this.state.pinfo.pic} alt="#" /></figure>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 product_detail_side">
                            <div class="abotext_box">
                                <div class="product-heading">
                                    <h2>{this.state.pinfo.title}</h2>
                                </div>
                                <div class="product-detail-side">
                                    <span class="new-price">Rs. {this.state.pinfo.price}</span>                                    
                                </div>
                                <div class="detail-contant">                            <div class="quantity">
                                    <input step="1" min="1" name="quantity" value={this.props.prodinfo.quantity} title="Qty" class="input-text qty text" size="4" type="number"/>
                                        </div> 
                                        <br/>                                
                                <button class="btn btn-danger" onClick={this.removeitem}>Delete</button>                                
                                </div>
                            </div>
                        </div>
                    </div>
    }
}