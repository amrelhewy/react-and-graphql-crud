import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
// this ! means that it can't be null 
const addBookQuery = gql`   
    mutation($name:String!,$genre:String!,$authorId:ID!) {  
      addBook(name: $name, genre: $genre, authorId: $authorId) {
        name
        id
      }
    }
`;

const GetBookInfoQuery=gql`
query($id:ID!){
  book(id:$id){
    name
    genre
    author{
      name
      age
      books{
        name
        id
      }
    }
  }
}
`
export { getAuthorsQuery, getBooksQuery, addBookQuery,GetBookInfoQuery };

//export you can use {} when taking out stuff
//export default you can only export the one thing you export defaulted
