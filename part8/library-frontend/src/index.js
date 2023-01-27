import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { setContext } from '@apollo/client/link/context'

//add the following funcs for confguration:
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client'

const authLink = setContext((_, { headers }) => {
    //the item is defined in the LoginForm
    const token = localStorage.getItem('book-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        },
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

//get the websocket link:
const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4000/graphql',
    })
)
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
    // link: authLink.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
