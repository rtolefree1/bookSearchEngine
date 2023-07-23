import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
    query me {
        me {
        _id
        name
        skills
        }
    }

`
