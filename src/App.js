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
import UsersTable from './components/UsersTable';
import {config} from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        refreshToken : dataService.getField('refreshToken'),
        roleId : dataService.getField('roleId')
    };
  }

  componentDidMount() {
    if (this.state.refreshToken != 'null') {
      TokenService.checkAccessTokenAsync()
      .then(this.setState({
        refreshToken : dataService.getField('refreshToken'),
        roleId : dataService.getField('roleId')
      }))
      .catch(e => console.log(e));
    }
  }

  render() {

    return (
      <div className="App">
        <Layout>
          <BrowserRouter>
            {
              (this.state.refreshToken == 'null') && <Redirect to='/login' />
            }
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/messages" component={Sending} />
            {
              (this.state.roleId == config.adminId) && <Route path="/users" component={UsersTable} />
            }
          </BrowserRouter>
        </Layout>
      </div>
    )
  }
}

export default App;