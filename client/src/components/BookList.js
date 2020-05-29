import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'
function BookList() { //we need to wrap the whole markup with apollo provider which kind of deals with setting apollo to work with react
    const {loading,data}=useQuery(getBooksQuery)
    const [id,setId]=useState();
    const displaybooks=()=>{
        if(loading) return <p>loading...</p>
        if(data)
        {
            return data.books.map((book,i)=>{
                return <li onClick={(e)=>{setId(book.id)}} key={i}>{book.name}</li>
            })
        }
    }
    

    return (
        <div>
            <ul id="book-list">
                {displaybooks()}
            </ul>
            <BookDetails bookid={id}/>
            
        </div>
    )
  }
export default  BookList
