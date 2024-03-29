import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            profile{
                _id
                name
            }
        }
    }

`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            username
            email
            password
        }
    }
`