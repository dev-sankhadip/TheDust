const { buildSchema }=require('graphql');
const { gql } =require('apollo-server-express')


const schema=buildSchema(`

    type User {
        _id: ID!
        fname:String!
        lname:String!
        username:String!
        email: String!
        password: String!
        birthDate:String!
        image:String!
    }

    type Blog {
        _id:ID!
        title:String!
        image:String!
        body:String!
        creator:String!
        created:String!
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input UserInput {
        fname:String!
        lname:String!
        username:String!
        email:String!
        password:String!
        birthDate:String!
        image:String!
    }

    input BlogInput {
        title:String!
        image:String!
        body:String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        user:[User!]!
        blogs:[Blog!]!
        login(email: String!, password: String!): AuthData!
        getAllBlogs:[Blog!]!
    }

    type RootMutation {
        createUser(userInput : UserInput) : User
        createBlog(blogInput : BlogInput) : Blog
        checkAuth(uid:ID) : String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports={
    schema
}