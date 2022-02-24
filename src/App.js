import logo from './logo.svg';
import './App.css';
import React from 'react';

import {Switch , Route} from 'react-router-dom'

import Menu from './menuComponent/Menu';
import Home from './homeComponent/Home';
import UserLogin from './userLoginComponent/UserLogin';
import UserVerify from './userLoginComponent/UserVerify';
import AdminLogin from './adminLoginComponent/AdminLogin';

import AdminHome from './adminHomeComponent/AdminHome';
import AdminCategory from './adminCategoryComponent/AdminCategory';
import AdminProduct from './adminProductComponent/AdminProduct';
import Cart from './cartComponent/Cart';

export default class App extends React.Component
{
  render(){
     return <div class="wrapper">
        <div id="content">
             <Menu/>

              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/userlogin" component={UserLogin}/>
                <Route path="/userverify" component={UserVerify}/>
                <Route path="/adminlogin" component={AdminLogin}/>

                <Route path="/adminhome" component={AdminHome}/>
                <Route path="/admincate" component={AdminCategory}/>
                <Route path="/adminprod" component={AdminProduct}/>

                <Route path="/cart" component={Cart}/>
              </Switch>

             
             <footer>                               
                     <div class="copyright">
                         <p>Copyright 2021 All Right Reserved By <a href="https://html.design/">Free html Templates</a></p>
                     </div>                         
             </footer>             
         </div>
     </div>
  }
}
