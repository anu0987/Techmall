import React from 'react';
import {USER_REGISTER,USER_LOGIN} from '../serverUrls'
import {Redirect} from 'react-router-dom';
export default class UserLogin extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            islogin:false,
            sendtoverify:false,
            loginmsg : "",
            regmsg : ""
        }
    }

    login = ()=>
    {
        var data = {        
            email : this.emailbox.value,
            password : this.passwordbox.value
        }

        fetch(USER_LOGIN,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify(data)
            }).then(response=>response.json()).then(data=>{
                if(data.status)
                {
                  if(data.verify)  
                    this.setState({loginmsg:'User Login !',islogin:true})            
                  else
                    this.setState({loginmsg:'Verify Your Account First !',sendtoverify:true})                             
                }
                else
                    this.setState({loginmsg:'User Login Failed !'})       
            })
    }

    register = ()=>
    {
        var data = {
            name  : this.namebox.value,
            email : this.regemailbox.value,
            password : this.regpassbox.value
        }

        fetch(USER_REGISTER,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify(data)
            }).then(response=>response.json()).then(data=>{
                if(data.status)
                {
                this.setState({regmsg:'User Saved !'})            
                }
                else
                    this.setState({regmsg:'User Failed !'})       
            })

    }

    render()
    {
        if(this.state.islogin){
            return <Redirect to="/"/>
        }

        if(this.state.sendtoverify){
            return <Redirect to="/userverify"/>
        }

        return <div>
            <div class="contact">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8 offset-md-2">
                             <div class="title">
                                 <h2>Register <strong class="black">Login</strong></h2>
 
                             </div>
                         </div>
                     </div>
                     <div class="row">                       
                     <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6"> 


                    <div class="row">   
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <input class="form-control" 
                                         ref={c=>this.namebox=c}
                                         placeholder="Name" type="text" name="name"/>
                    </div>
                     
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <input class="form-control" 
                                         ref={c=>this.regemailbox=c}
                                         placeholder="Email" type="text" name="Email"/>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <input class="form-control" 
                                         ref={c=>this.regpassbox=c}
                                         placeholder="Password" type="password" name="pass"/>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                         <button onClick={this.register} class="send">Register</button>
                                         &nbsp;
                                         <b class='text-danger'>{this.state.regmsg}</b>
                                     </div>

                    </div>

                     </div>
                         <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">                            
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
