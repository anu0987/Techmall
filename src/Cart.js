import CartItem from './CartItem';
import { LOAD_CART,REMOVE_ITEM_CART } from '../serverUrls'
import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../stripePayment/CheckoutForm'


const stripePromise = loadStripe("pk_test_51H47bhGn0V8TkBtW76znkhJe871UyjlxKq6QUzwRkFzwXLGMkptXFViE2loGuWDjmZOeudddJn51CKUq6RFozr4X009E1WcTc8");




export default class Cart extends React.Component 
{
    constructor(props) {
        super(props)
        this.state = {           
            cartlist : [],
            paymentCompleted:false                      
        }  
        this.loadcart();    
    }

    setPaymentCompleted = (status)=>
    {
      this.setState({paymentCompleted:status})
    }

    successMessage = () => {
      return (
        <div className="success-msg">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </svg>
          <div className="title">Payment Successful</div>
        </div>
      )
    }

    deleteItem = (pid)=>
    {    
        this.setState({cartlist:[]})
        fetch(REMOVE_ITEM_CART,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({pid:pid})
            }).then(response=>response.json()).then(response=>{               
                this.setState({cartlist:response})
            })
    }

    loadcart = ()=>
    {
        fetch(LOAD_CART).then(response=>response.json()).then(data=>
        {
           this.setState({cartlist:data})
        });
    }

    render(){
        return <div>
             <div class="contactus">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <div class="title">
                                <h2>My Cart Product</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="layout_padding-2">
                <div class="container">

                 {this.state.cartlist.map((rec,index)=>
                 {
                     return <CartItem prodinfo={rec} 
                        delitem={this.deleteItem} ref={index}/>
                 })}

            </div></div>
            <hr/>

             <div className="container">
      <div className="py-5 text-center">
        <h4>Stripe Integration</h4>
      </div>

      <div className="row s-box">
        {this.state.paymentCompleted ? this.successMessage() : <React.Fragment>         
          <div className="col-md-7 order-md-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={2000} 
              setPaymentCompleted={this.setPaymentCompleted} />
            </Elements>
          </div>
        </React.Fragment>}
      </div>

    </div>        

        </div>
    }
}

// 4242424242424242
// 11 26 , 145