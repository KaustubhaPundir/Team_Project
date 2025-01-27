const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // await mongoose.connect('mongodb://localhost:27017/testDB',{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // })
        await mongoose.connect('mongodb://0.0.0.0:27017/testDB',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connection to mongodb successful');
    }catch(err){
        console.log('Mongodb connection Error:', err)
    }
}
module.exports = connectDB;