import React,{useState} from 'react'
import {useQuery,useMutation} from '@apollo/react-hooks'
import {getAuthorsQuery,getBooksQuery,GetBookInfoQuery} from '../queries/queries'
import { QueryData } from '@apollo/react-hooks/lib/data/QueryData';



export default function BookDetails(props) {
let bookid=props.bookid
    const BookDetails = () => {
        const { loading, error, data } = useQuery(GetBookInfoQuery, {
           variables: { id: bookid }
        });
      
      if(loading) return <p>Loading data ...</p>
      if(!bookid) return <p>no book selected</p>
      return(
        <div id="book-details">
              <h2>{data.book.name}</h2>
              <p>{data.book.genre}</p>
              <p>{data.book.author.name}</p>
               <ul className="other-books"> 
              {data.book.author.books.map(item=> { return <li key={item.id}>{item.name}</li>})}  
              </ul> 
              </div>
      ) 

    }
  

    return (
        <div id="book-details">
            <p>Book Details</p>
            {BookDetails()}
        </div>
    )
}
