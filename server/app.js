const express=require('express');
const graphqlHttp=require('express-graphql');
const mongoose=require('mongoose');

//get graphql resolvers and schema
const { schema }=require('./graphql/schema/index');
const graphqlResolvers=require('./graphql/resolvers/rootResolver');

//get jsonwebtoken auth checking module
const isAuth=require('./middleware/is-auth');
const { key }=require('./key');

//initialize express
const app = express();

//set all middleware
app.use(express.json({ limit:'10mb' }));
app.use(express.urlencoded({ extended: true, limit:'10mb' }));
app.use(express.static('build'));
app.use(isAuth);

//allow header and options method
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: schema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);


//connect to mongo database
mongoose.connect(key,{ useNewUrlParser:true, useUnifiedTopology:true })
.then((res)=>
{
    console.log('mongodb connected');
})
.then(()=>{
  app.listen(8000, ()=>
  {
    console.log('connected to 8000');
  })
})
.catch((err)=>
{ 
  console.log(err); 
})
