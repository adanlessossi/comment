const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// use the graphql middleware
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
})
