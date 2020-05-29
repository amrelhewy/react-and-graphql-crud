const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const graphqlHTTP = require('express-graphql');
const schema=require('./schema/schema'); //importing schema file
mongoose.connect('mongodb+srv://admin:admin@cluster0-bkyhu.mongodb.net/library?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log('connected to MongoDB')})
//handle graphql requests
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema, // adding our schema to the middleware
    graphiql:true

}))  //when u visit this route express doesnt know how to handle requests of graphql but express-graphql does so we hand it to them

app.listen(4000,()=>{console.log('Server started on port 40000')});
