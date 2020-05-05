import { queries as masterdataQueries } from './masterdata'

export const resolvers = {
    //Mutation: {},
    Query: {
        ...masterdataQueries
    }
}