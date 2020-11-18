const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = `mongodb+srv://mehedi49:18sPZ7eGWOHOWdgI@cluster0.sqi5q.mongodb.net/CreateAPIdb.?retryWrites=true&w=majority`;
const cors = require('cors');
require('dotenv').config();

let port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("CreateAPIdb").collection("userData");
  
    app.get('/users', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        });
    });

    app.post('/addUser', (req, res) => {
        const userInfo = req.body;
        console.log(userInfo);
        collection.insertOne(userInfo)
        .then(result => {
            // console.log("data added successfully...");
            res.redirect('/');
        });
    });

    app.delete('/delete/:id', (req, res) => {
        collection.deleteOne({_id: ObjectId(req.params.id)})
        .then((result) => {
            res.send(result.deletedCount > 0);
        })
    });
//   client.close();
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(port);

