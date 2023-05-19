import { gql } from '@apollo/client'

export const GET_ME = gql`
    query me {
        me {
            _id
            username
        }
    }
`

export const GET_ALGO = gql`
    query Algo($number: Int!) {
        algo(number: $number) {
            number
            starterCode
            readMe
            name
        }
    }
`

export const GET_ALGOS = gql`
    query Algos {
        algos {
            _id
            number
            starterCode
            readMe
            name
        }
    }
`