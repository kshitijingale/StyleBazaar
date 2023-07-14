const mongoose = require('mongoose');
const config = require('../config/index')

exports.connect = () => {
    mongoose.connect(config.MONGO_URI)
        .then((conn) => {
            console.log(`DB Connected : ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(err.message);
            console.log("DB Connection failed");
            process.exit(1);
        })
}