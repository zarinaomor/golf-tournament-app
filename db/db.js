const mongoose = require('mongoose')

const connectionString = "mongodb://localhost/courses"

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose is connected on ${connectionString}`)
});

mongoose.connection.on('disconnected', ()=>{
    console.log(`mongoose is disconnected from ${connectionString}`)
});

mongoose.connection.on('error', (err)=>{
    console.log(err)
})