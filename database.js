import mongoose from "mongoose";

export  function dbConnection(URI){
    mongoose.connect(URI).then(()=> console.log(`Database is connected`))
    .catch(err=>console.log(`Error connected to the server ${err}`))
}