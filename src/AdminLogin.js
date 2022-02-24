import React from 'react';
import {Redirect} from 'react-router-dom';
import {ADMIN_LOGIN} from '../serverUrls'


export default class AdminLogin extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            islogin : false,
            loginmsg : ""
        }
    }

    login = ()=>{
        var email = this.emailbox.value
        var pwd = this.passwordbox.value

       //fetch("http://localhost:8000/admin/login")
       var url = ADMIN_LOGIN + "?email="+email+"&pwd="+pwd; 
       fetch(url).then(response=>response.json()).then(data=>
       {
            console.log(data)
            this.setState({islogin:data.status,loginmsg:data.msg})

       });
    }

    render()
    {
        if(this.state.islogin){
            return <Redirect to="/adminhome"/>
        }

        return <div>
            <div class="contact">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8 offset-md-2">
                             <div class="title">
                                 <h2>Admin <strong class="black">Login</strong></h2>
 
                             </div>
                         </div>
                     </div>
                     <div class="row">                       
                         <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 padddd">                            
                                 <div class="row">                                    
                                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                         <input class="form-control" 
                                         ref={c=>this.emailbox=c}
                                         placeholder="Email" type="text" name="Email"/>
                                     </div>
                                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                         <input class="form-control" 
                                         ref={c=>this.passwordbox=c} placeholder="Password" type="password" name="Phone"/>
                                     </div>
                                    
                                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                         <button onClick={this.login} class="send">Login</button>
                                         &nbsp;
                                         <b class='text-danger'>{this.state.loginmsg}</b>
                                     </div>
                                 </div>                             
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    }
}