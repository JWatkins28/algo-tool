import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            me {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
            me {
                _id
                username
            }
        }
    }    
`

export const ADD_ALGO = gql`
    mutation addAlgo($number: Int!, $starterCode: String!, $readMe: String!, $name: String!) {
        addAlgo(number: $number, starterCode: $starterCode, readMe: $readMe, name: $name) {
            number
            starterCode
            readMe
            name
        }
    }
`