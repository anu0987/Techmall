import React from "react";
import {Link} from 'react-router-dom'
import './Menu.css'

import { LOGOUT } from "../serverUrls";

export default class Menu extends React.Component
{    
    constructor(props)
    {
        super(props)
        this.state={
            isuserlogin : false , 
            usertype : ''
        }

        setInterval(this.loginCheck,1000);
    }

    loginCheck = ()=>
    {
        fetch(LOGOUT).then(response=>response.json()).then(data=>
        {
           this.setState({isuserlogin:data.status,usertype:data.type})  
        });
    }

    render()
    {
       var menuUL = "";
       if(! this.state.isuserlogin)
       {
           menuUL = <ul className="ul">
                        <li>
                            <Link to="/"><b>Home</b></Link>
                        </li>
                        <li>
                        <Link to="/userlogin"><b>User</b></Link>
                        </li>
                        <li>
                        <Link to="/adminlogin"><b>Admin</b></Link>
                        </li>
                        <li>
                        <Link to="/cart"><b>Cart</b></Link>
                        </li>
                    </ul>
       }else{
           if(this.state.usertype=='admin')
           {
            menuUL = <ul className="ul">
                        <li>
                            <Link to="/adminhome"><b>Home</b></Link>
                        </li>
                        <li>
                        <Link to="/admincate"><b>Category</b></Link>
                        </li>
                        <li>
                        <Link to="/adminprod"><b>Product</b></Link>
                        </li>
                        <li>
                        <Link to="/cart"><b>Cart</b></Link>
                        </li>
                        <li>
                        <Link to="/"><b>Logout</b></Link>
                        </li>
                    </ul>
           }

           if(this.state.usertype=='customer')
           {
            menuUL = <ul className="ul">
                        <li>
                            <Link to="/"><b>Home</b></Link>
                        </li>
                        <li>
                        <Link to="/profile"><b>Profile</b></Link>
                        </li>
                        <li>
                        <Link to="/cart"><b>Cart</b></Link>
                        </li>
                        <li>
                        <Link to="/"><b>Logout</b></Link>
                        </li>
                    </ul>
           }
       }


        return <header className="Menu">       
        <div class="header">

            <div class="container-fluid">

                <div class="row">
                    <div class="col-lg-3 logo_section">
                        <div class="full">
                            <div class="center-desk">
                                <div class="logo">
                                    <a href="index.html"><img src="assets/images/logo.jpg" alt="#"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="right_header_info">
                            {menuUL}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </header>
    }
}