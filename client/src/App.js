import logo from './logo.svg';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { test } from './utils/queries';
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import NoMatch from "./components/NoMatch"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Main/Main"
import { setContext } from '@apollo/client/link/context';
import Dashboard from './components/Dashboard';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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
      <div className="flex-column justify-flex-start min-100-vh">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/profile/:username?" component={Dashboard}></Route>
            <Route path="*" component={NoMatch} />
          </Switch>
          
        </Router>

      </div>
    </ApolloProvider>
  );
}

export default App;
