import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql', // you do not need to put 
                   // http://localhost:3001 because it defined
                   // as a proxy in package.json, in this Client folder
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
      <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<SearchBooks />} 
              />
              <Route 
                path="/savedBooks" 
                element={<SavedBooks />} 
              />
              <Route 
                path="/signup" 
                element={<SignupForm />} 
              />
              <Route 
                path="/login" 
                element={<LoginForm />} 
              />
            </Routes>
          </div>
          
        </div>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
