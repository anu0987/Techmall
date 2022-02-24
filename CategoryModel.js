const mongo = require('./DBConnection')

var Category = function()
{
    this.saveCategory = (data,callback)=>
    {
        console.log("Cate Model : ", data)
        mongo(db=>{
            if(db){
                db.collection('category').insertOne(data,(err)=>
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

    this.listCategory = (callback)=>
    {        
        mongo(db=>{
            if(db){
                db.collection('category').find().toArray((err,result)=>
                {
                    if(err)
                    {
                        console.log(err)
                        callback([])
                    }else
                        callback(result)
                });                
            }else{
                callback([])
            }
        })
    }
}

module.exports = new Category()