import React from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
//components
import BookList from "./components/BookList";
import AddBook from './components/AddBook'

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"  //the uri of the graphql i'm requesting from
});
function App() { //we need to wrap the whole markup with apollo provider which kind of deals with setting apollo to work with react
  return (
    <ApolloProvider client={client}> 
      <div id="main">
        <h1>Book Names</h1>
        <BookList />
        <AddBook/>
      </div>

    </ApolloProvider>
  );
}

export default App;

//how to query?
//1-construct the query
//2-we bind the query to the component so we have all the data from the query
//3-so we need to parse our query because graphql isn't javascript so we need a parser for reaact to understand