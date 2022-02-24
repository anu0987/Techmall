import React from 'react';
import {Redirect} from 'react-router-dom';
export default class UserVerify extends React.Component
{
    constructor(props){
        super(props)        
    }

    render(){
        return <div>
        <div class="contact">
             <div class="container-fluid">
                 <div class="row">
                     <div class="col-md-8 offset-md-2">
                         <div class="title">
                             <h2>Verify <strong class="black">User</strong></h2>

                         </div>
                     </div>
                 </div>
                 <div class="row">                                        
                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">                            
                             <div class="row">                                    
                                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                     <input class="form-control" 
                                     ref={c=>this.emailbox=c}
                                     placeholder="Email" type="text" name="Email"/>
                                 </div>
                                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                     <input class="form-control" 
                                     ref={c=>this.otpbox=c} placeholder="OTP" type="password" name="Phone"/>
                                 </div>
                                
                                 <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                     <button onClick={this.login} class="send">Verify</button>
                                     
                                 </div>
                             </div>                             
                     </div>
                 </div>
             </div>
         </div>
    </div>
    }
}