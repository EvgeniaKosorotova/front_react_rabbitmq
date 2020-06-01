import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom'
import Layout from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Sending } from './components/Sending';
import dataService from './services/DataService';
import TokenService from './services/TokenService';

class App extends Component {
  constructor(props) {
    super();
  }
  
  render() {
    let refreshToken = dataService.getField('refreshToken');

    if (!(refreshToken === null || refreshToken === undefined)) {
      TokenService.checkAccessTokenAsync()
      .then(refreshToken = dataService.getField('refreshToken'))
      .catch(e => console.log(e));
    }

    return (
      <div className="App">
        <Layout>
          <BrowserRouter>
            {//(refreshToken === null || refreshToken === undefined) ? <Redirect to='/login'/> : <Redirect to='/messages'/>
            }
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/messages" component={Sending} />
          </BrowserRouter>
        </Layout>
      </div>
    )
  }
}

export default App;