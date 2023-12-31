const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const app = express();
const port = 4000 ;
require('dotenv').config();

const URI = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.q23poih.mongodb.net/?retryWrites=true&w=majority`

app.use(cors());
app.use(bodyParser.json());

const withDB = async(operations , res) => {
    try{
        const client = await MongoClient.connect(URI,
            { useNewUrlParser : true , useUnifiedTopology : true }
        )

        const db = client.db('crud');
        await operations(db);
        client.close();
    } catch(error){
        res.status(500).send('failed to connect');
        console.log('Failed To Connect', error);
    }
};

app.get('/api/db-data', async(req,res) => {

    withDB(async(db) => {
        const userData = await db.collection('test').find().toArray();
        res.status(200).json(userData);
    }, res);
});

app.post('/api/new-contact-data', (req , res) => {
    const newUser = req.body ;

    withDB( async(db) => {
        await db.collection('test').insertOne({
            Name : newUser.name ,
            Location : newUser.location ,
            Phone : newUser.phone ,
        });
        res.status(200).json(newUser);
    }, res);
});

app.delete('/api/delete-user/:phoneId', (req ,res) => {
    const id = req.params.phoneId ;
    withDB(async(db) => {
        await db.collection('test')
        .findOneAndDelete({Phone : id})
        res.status(200).send('succesfull delted');
    }, res);
})

app.listen(port , () => {
    console.log(`Listening On Port : ${port}`)
});