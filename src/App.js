import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Sending } from './components/Sending';
import {tokenData} from './components/TokenData';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          {
            tokenData.currentTokensValue === null &&
            <div>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          }
          {
            tokenData.currentTokensValue.RefreshToken !== null &&
            <Route path="/messages" component={Sending} />
          }
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
