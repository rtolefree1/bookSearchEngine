const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    # There is now a field to store the user's password
    password: String
    #saveBooks: [Book]
  }

  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    user: User
  }

 #type BookInput{
 
 #}

  type Query {
  
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    users:User
    user:User
  }

  type Mutation {
    # Set up mutations to handle creating a user or logging into a account and return Auth type
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    #saveBook(bookInput: BookInput!): User

    

  }

 


`;

module.exports = typeDefs;
