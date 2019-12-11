const { buildSchema }=require('graphql');

module.exports=buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    type Blog {
        _id:ID!
        title:String!
        image:String!
        body:String!
        creator:String!
        created:String!
    }

    input UserInput {
        email:String!
        password:String!
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