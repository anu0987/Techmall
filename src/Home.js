import React from 'react';
import { ADMIN_CATEGORY,ADMIN_SEARCH_PRODUCT,ADD_CART } from '../serverUrls'
import './Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categorylist: [],
            productlist: [],
            price : undefined,
            category : undefined
        }
        this.loadCategory()
    }

    pchange = (event)=>{
        this.setState({price: event.target.value})
    }

    addcart = (event)=>{
        var pid = event.target.getAttribute('data-pid');
        fetch(ADD_CART,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({pid:pid})
            }).then(response=>response.json()).then(data=>
            {
               alert('Done !');                   
            })
    }

    search = (event)=>
    {
        var id = event.target.getAttribute('data-id')
        fetch(ADMIN_SEARCH_PRODUCT,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({cid:id})
            }).then(response=>response.json()).then(data=>
            {
                this.setState({productlist:data,category:event.target.innerHTML})                      
            })
    }

    loadCategory = () => {
        fetch(ADMIN_CATEGORY).then(response => response.json()).then(records => {
            console.log(records)
            this.setState({ categorylist: records })
        });
    }

    render() {
        return <div>
            <section class="slider_section">
                <div class="banner_main">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 mapimg">
                                <div class="text-bg">
                                    <h1>The latest <br /> <strong class="black_bold">furniture Design</strong><br /></h1>
                                    <a href="#">Shop Now <i class='fa fa-angle-right'></i></a>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div class="text-img">
                                    <figure><img src="assets/images/bg.jpg" /></figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="contactus">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <div class="title">
                                <h2>Our Product</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="brand">
                <div class="container">
                    <h1 align='center'> {this.state.category} Products</h1>
                    <div class="row">
                        <div class='col-lg-3 col-md-3'>
                            <h1>Catgory</h1>
                            <ul>
                                {this.state.categorylist.map(record => {
                                    return <li className="li">
                            <b onClick={this.search} data-id={record._id}>
                                        {record.title} </b>
                                    </li>
                                })}
                            </ul>
                            <hr/>
                            <h1> Price : <span>{this.state.price}</span></h1>
                <input type="range" min="1000" max="200000"
                onChange={this.pchange}
                class='form-control'/>
                        </div>

                        <div class='col-lg-9 col-md-9'>


                            <div class="ourproduct">
                                <div class="container">
                                    <div class="row product_style_3">

                                    {this.state.productlist.map(rec=>
                                    {
                                        return <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                        <div class="full product">
                                            <div class="product_img">
                                                <div class="center"> 
                            <img src={"assets/productpic/"+rec.pic} alt="#" />
                                                    <div class="overlay_hover">     
                         <b onClick={this.addcart} data-pid={rec._id}
                          class='btn btn-info'> Add to cart </b>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="product_detail text_align_center">
                                            <p class="product_price">Rs. {rec.price}</p>
                                                <p class="product_descr">{rec.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    })}    
                                        
                                    </div>
                                </div></div>


                        </div>

                    </div>
                </div>
            </div>

            <div class="contact">
                <div class="container-fluid padddd">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <div class="title">
                                <h2>Contact <strong class="black">Us</strong></h2>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 padddd">
                            <div class="map_section">
                                <div id="map">
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 padddd">
                            <form class="main_form">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <input class="form-control" placeholder="Name" type="text" name="Name" />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <input class="form-control" placeholder="Email" type="text" name="Email" />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <input class="form-control" placeholder="Phone" type="text" name="Phone" />
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <textarea class="textarea" placeholder="Message" type="text" name="Message"></textarea>
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <button class="send">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}