const mongo = require('./DBConnection')

var User = function()
{
    this.loginUser = (data,callback)=>
    {        
        mongo(db=>{
            if(db)
            {
                var where={email:data.email,password:data.password }
                console.log(">> ",where)
                db.collection('user').findOne(where,(err,result)=>
                {
                    console.log(result)
                        if(err || result==null)
                        {
                            console.log(err)
                            callback(false)
                        }else
                            callback(result)
                });                
            }else{
                callback(false)
            }
        })
    }


    this.saveUser = (data,otp,callback)=>
    {   
        data.otp = otp
        data.isverify = false
        mongo(db=>{
            if(db){
                db.collection('user').insertOne(data,(err)=>
                {
                    if(err)
                        callback(false);
                    else
                        callback(true);                        
                });                
            }else{
                callback(false)
            }
        })
    }
}

module.exports = new User()