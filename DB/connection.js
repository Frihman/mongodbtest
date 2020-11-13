const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@clustertest.vzcfd.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('DB connected!');
}



module.exports = connectDB;