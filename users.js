const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId(),
    name: String,
    email: String,
    address: String
})
module.exports = new mongoose.model('users', userSchema)