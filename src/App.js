import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import { Login } from './components/Login';
import { Sending } from './components/Sending';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Route path="/login" component={Login} />
          <Route path="/messages" component={Sending} />
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
