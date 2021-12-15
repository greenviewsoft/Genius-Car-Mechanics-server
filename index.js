const express = require('express');   //step 1
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const cors =  require('cors');
require('dotenv').config()


const app = express();    //step 2
const port = 5000;  //step 3


//miiddleware
app.use(cors());
app.use(express.json());


//mongodb database connetions
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yekno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run (){
    try{
 await client.connect();
const database = client.db('carMechanic')
const serviceCollection = database.collection('services');



//GET SINGLE SERVICE
app.get('/services/:id', async (req, res) =>{
    const id = req.params.id;
    console.log('getting specia service', id);
    const query = {_id: ObjectId(id) };
    const service = await serviceCollection.findOne(query);
    res.json(service)
})





////GET API  /ডাটা নেওয়া 
app.get('/services', async(req, res) =>{
    const cursor = serviceCollection.find({});
    const services = await cursor.toArray();
    res.send(services);
})




//POST API

app.post('/services', async(req, res) =>{
const service = req.body;
console.log('hit the post api', service);


const  result = await serviceCollection.insertOne(service);
console.log(result);
res.json(result)
});




//DELETE API

app.delete('/services/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id : ObjectId(id) };
    const result = await serviceCollection.deleteOne(query);
    res.json(result);
})






 //console.log('connected to database');
        
    }
    finally{


    //await client.close();    

    }

}

run().catch(console.dir);


//step 4

app.get('/', (req, res) => {
    res.send('Running Genius Server Mahabub');
});



//step 5
app.listen(port, () =>{
    console.log('Running Genius Server on port', port);
})