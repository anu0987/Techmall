const mongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017";

function getConnection(callback)
{
    mongoClient.connect(url,{useUnifiedTopology: true},(err,client)=>
    {
        if(err)
        {
            console.log(err)
            callback(false)
        }
        else
        {
            var db = client.db('techmall')
            callback(db)    
        }
    })
}
module.exports = getConnection;