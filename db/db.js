const mongoose = require('mongoose')

const connectionString = process.env.DB_COURSE

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