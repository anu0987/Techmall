import React from 'react'
import {ADMIN_CATEGORY} from '../serverUrls'

// db.category.createIndex({title:1},{unique:true})

export default class AdminCategory extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            categorylist:[]
        }

        this.loadCategory()
    }

    loadCategory = ()=>{
        fetch(ADMIN_CATEGORY).then(response=>response.json()).then(records=>
        {
            console.log(records)
                this.setState({categorylist:records})
        });
    }

    save = ()=>{
        var title = this.ctitleBox.value;

        fetch(ADMIN_CATEGORY,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body: JSON.stringify({title:title})
            }).then(response=>response.json()).then(data=>{
                if(data.status)
                {
                    this.setState({msg:'Category Saved !'})
                    this.loadCategory()
                }
                else
                    this.setState({msg:'Category Failed !'})                    
            })
    }

    render(){
        return <div>
             <div class="contact">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8 offset-md-2">
                             <div class="title">
                                 <h2>Product<strong class="black">&nbsp; Category</strong></h2> 
                             </div>
                             <hr/>                             
                         </div>
                     </div>

                     <div class="row">
                        <div class='col-lg-1 col-md-1 col-sm-1'></div>                         
                        <div class='col-lg-6 col-md-6 col-sm-6'>
                            <input type="text" ref={c=>this.ctitleBox=c}class='form-control' placeholder="Category Title"/>
                        </div>                         
                        <div class='col-lg-4 col-md-4 col-sm-4'>
                            <button class='btn btn-info' onClick={this.save}>Add Category</button>    
                            &nbsp;
                            <b class='text-danger'>{this.state.msg}</b>
                        </div>                         
                        <div class='col-lg-1 col-md-1 col-sm-1'></div>                         
                     </div>
                     <hr/>        

                     <table class='table'>
                            <tr>
                                <th>S. No.</th>
                                <th>Category Title</th>
                                <th>Operation</th>
                            </tr>

                            {this.state.categorylist.map((row,index)=>
                            {
                               return <tr>
                                    <th>{index+1}</th>
                                    <th>{row.title}</th>
                                    <th></th>
                                </tr>
                            })}
                     </table>
                </div>
            </div>
        </div>
    }
}