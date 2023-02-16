// Load Mongoose
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./users');
const app = express();
const jsonParser = bodyParser.json();
// app.use(express.json());


// create connection
// mongodb + srv://Demo1:Demo@demo.nyi0ycm.mongodb.net/Demo
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Demo1:Demo@demo.nyi0ycm.mongodb.net/Demo?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }
);
// Select Data
app.get('/', jsonParser, (req, res) => {
    User.find().then((data) => {
        res.json(data)
        console.log('Selecting Successful')
    })
})
// Insert Data
app.post('/', jsonParser, (req, res) => {
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })
    data.save().then((result) => {
        res.json(result)
        console.log('Inserting Successful')
    })
        .catch(err => console.log(err))
})
// Update Data
app.put('/:id', jsonParser, (req, res) => {
    User.updateOne({ _id: req.params.id }, {
        $set:
        {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        }
    }).then((result) => {
        res.json(result)
        console.log('Updating Successful')
    }).catch(err => console.log(err))
})
// Delete Data
app.delete('/:id', jsonParser, (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.json(result)
        console.log('Deleting Successful')
    }).catch(err => console.log(err))
})
// Search Data
app.get('/search/:name', jsonParser, (req, res) => {
    var regex = new RegExp(req.params.name, 'i');
    User.find({ name: regex }).then((data) => {
        res.json(data)
        console.log('Searching Successful')
    })
})
app.listen(4500, () => console.log("Server Loading"))

// .then(() => {
//     console.log('connection done');
// })

// User.find({}, function (err, users) {
//     if (err) console.log(err);
//     console.log(users);
// })

// Records Object
// const userdata = [{
//     _id: new mongoose.Types.ObjectId(),
//     name: "jaydeep",
//     email: "jaydeep@gmail.com",
//     address: "taliban"
// },
// {
//     _id: new mongoose.Types.ObjectId(),
//     name: "khushi",
//     email: "khushi@gmail.com",
//     address: "russia"
// }]

// Inserting one or more records
// userdata.map((item)=>{
//     const data = new User(item)
//     data.save().then((result) => {
//         console.log(result)
//     })
//         .catch(err => console.log(err))
// })

// Inserting one record 
// const data = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: "jaydeep",
//     email: "jaydeep@gmail.com",
//     address: "america",
// });



