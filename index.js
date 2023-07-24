const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//collegeHEHE
// wn7cShL7uNmoRqUV



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.CLG_USERS_NAME}:${process.env.CLG_USERS_PASS}@cluster0.fs0mclr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // const collegeCardsCollection = client.db('college').collectio('collegecards')
    const cardCollection = client.db('college').collection('clgcards')
    const collegesCollection = client.db('college').collection('colleges')
    const admissionCollegesCollection = client.db('college').collection('admission')

    //all admission
    const allAdmissionColleges = client.db('college').collection('allAdmissionCollege')
    const usersCollection = client.db('college').collection('users')



    //clgcards
    app.get('/clgcards', async(req, res) => {
      const result =await cardCollection.find().toArray()
      res.send(result)
    })

    app.get('/clgcards/:id', async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await cardCollection.findOne(query)
      res.send(result)
    })

    //colleges api
    app.get('/colleges', async(req, res) => {
      const result =await collegesCollection.find().toArray()
      res.send(result)
    })

    app.get('/colleges/:id', async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await collegesCollection.findOne(query)
      res.send(result)
    })
  

    //admissionCollges

    app.get('/admission', async(req, res) => {
      const result =await admissionCollegesCollection.find().toArray()
      res.send(result)
    })

    app.get('/admission/:id', async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await admissionCollegesCollection.findOne(query)
      res.send(result)
    })




    //all admission collge

    // app.get('/allAdmissionCollege', async (req, res) => {
    //   const email = req.query.email;
    //   if (!email) {
    //     res.send([]);
    //   }
    //   const decodedEmail = req.decoded.email;
    //   if (email !== decodedEmail) {
    //     return res.status(403).send({ error: true, message: 'forbidden access' })
    //   }
    //   const query = { email: email }; 

    //   const result = await allAdmissionColleges.find(query).toArray();
    //   res.send(result);
    // });



    ///

 
    app.get('/allAdmissionCollege', async (req, res) => {
      // console.log(req.query.email);
      let query = {};
      if (req.query?.candidateEmail) {
        query = { candidateEmail: req.query.candidateEmail }
      }
      const result = await allAdmissionColleges.find(query).toArray();
      res.send(result)
    })

    app.get('/allAdmissionCollege/:id', async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await allAdmissionColleges.findOne(query)
      res.send(result)
    })

   


    ///
   app.post('/allAdmissionCollege', async(req, res) => {
    const addCollege = req.body;
    console.log(addCollege);
    const result = await allAdmissionColleges.insertOne(addCollege);
    res.send(result)
   })
  



      // users data
      app.get('/users', async (req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
      });
  
      app.post('/users', async (req, res) => {
        const user = req.body;
        const query = { email: user.email }
        const existingUser = await usersCollection.findOne(query);
  
        if (existingUser) {
          return res.send({ message: 'user email already exists' })
        }
  
        const result = await usersCollection.insertOne(user);
        res.send(result);
      });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('college server is running')
})
app.listen(port, () => {
  console.log(`college server is running on port : ${port}`);
})