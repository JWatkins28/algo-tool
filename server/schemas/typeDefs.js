const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
    }

    type Algos {
        _id: ID
        number: Int
        starterCode: String
        readMe: String
        name: String
    }

    type Auth {
        token: ID!
        me: User
    }
  
    type Query {
        me: User
        algo(number: Int!): Algos
        algos: [Algos]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        addAlgo(number: Int!, starterCode: String!, readMe: String!, name: String!): Algos
    }
`

module.exports = typeDefs;