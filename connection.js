const mongoose = require('mongoose')
//making a function(async one)

async function connectMongoDB(url){
    return mongoose.connect(url);
}

module.exports={connectMongoDB}