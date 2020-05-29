const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book')
const Author=require('../models/author');
//defining a schema, the graph
//1-- object types (books , authors)
const {GraphQLObjectType , GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull} =graphql;

const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({ //we wrap in functions because we need to wait until the whole page has loaded to avoid circular reference because authortype has not ran yet
        id:{
            type:GraphQLID
        },
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId)
            }
        }
    })
});
const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{
            type:GraphQLID
        },
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId:parent._id})
            }
        }
    })
})

//the root query (  the main query the user jumps in the graph with )

const rootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    //each one of these fields represents a root query type (particular book, author or all books ,authors)
    fields:{
        //imp name of query
    book:{  //specific book
        type:BookType,
        args:{id:{type:GraphQLID}},// this args lets us search the specific book via the id (the input in the argument)
        resolve (parent,args){  //args.id property because we defined the id in the args  , the resolve function fires after we give the arguments and such.
            //code to get data from DB (m-Lab)
            return Book.findById(args.id)
    
        }
    },
    author:{ //specific author
        type:AuthorType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
           return Author.findById(args.id)
        }
    },
    books:{
        type:new GraphQLList(BookType),
        resolve(parent,args){
            return Book.find({});
        }
    },
    authors:{
        type:new GraphQLList(AuthorType),
        resolve(parent,args){
            return Author.find({});
        }
    }
    }
});

const Mutation=new GraphQLObjectType({  //add author,delete author ,,, add book , delete book
    name:'Mutation',
    fields:{
     addAuthor:{  //adding an author
         type:AuthorType,
        args:{
            name:{type:new GraphQLNonNull(GraphQLString)},
            age:{type:new GraphQLNonNull(GraphQLInt)},
        }     ,
         resolve(parent,args){
            let author=new Author({
                name:args.name,
                age:args.age
            })
        return  author.save();

        }
        
    },
    addBook:{
        type:BookType,
        args:{
            name:{type:new GraphQLNonNull(GraphQLString)},
            genre:{type:new GraphQLNonNull(GraphQLString)},
            authorId:{type:new GraphQLNonNull(GraphQLID)}
        },
        resolve(parent,args){
           let book=new Book({
               name:args.name,
               genre:args.genre,
               authorId:args.authorId
           });
           return book.save();
        }
    }
    }
})
module.exports=new GraphQLSchema({  //defining the rootquery from when the user uses it form the front end.
    query:rootQuery,
    mutation:Mutation
});


//mutations in graphQL are responsible for any editing in data (adding,deleting, editing)