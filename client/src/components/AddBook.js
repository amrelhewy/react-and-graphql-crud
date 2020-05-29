import React,{useState} from 'react'
import {useQuery,useMutation} from '@apollo/react-hooks'
import {getAuthorsQuery,addBookQuery,getBooksQuery} from '../queries/queries'

export default function AddBook() {

    const {loading,data}=useQuery(getAuthorsQuery);
    const [name,setName]=useState('');
    const [genre,setGenre]=useState('');
    const [authorID,setauthorId]=useState(0);
const [addbookMut,{dataMutation}]=useMutation(addBookQuery);
function getAuthors(){
    if(loading) return <option disabled>Loading ...</option>
    return data.authors.map(author=>{
return <option key={author.id} value={author.id}>{author.name}</option>
    });
}
function submit(e){
   
   e.preventDefault();
   addbookMut({
       variables:{
           name:name,
           genre:genre,
           authorId:authorID
       },                                    //refetching queries again after adding/editing them.
       refetchQueries:[{
           query:getBooksQuery
       }]
   }).then().catch((err)=>{console.log(err)});
   
  
}
    return (
        <form id="add-book" onSubmit={submit}>
         <div className="field">
             <label>Book Name:</label>
             <input type="text" onChange={(e)=>setName(e.target.value)}/>
         </div>
         <div className="field">
             <label>Book genre:</label>
             <input type="text" onChange={(e)=>setGenre(e.target.value)}/>
         </div>
         <div className="field">
             <label>Author:</label>
             <select onChange={(e)=>setauthorId(e.target.value)}>
                 <option>Select Author</option>
                 {getAuthors()}
             </select>
         </div>
         <button type="submit" >+</button>
        </form>

    )
}
