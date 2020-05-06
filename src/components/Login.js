import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import {tokenData} from './TokenData';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: '' 
    };
  }

  changeHandlerUsername = (event) => {
    this.setState({username: event.target.value});
  }

  changeHandlerPassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    tokenData.login(this.state.username, this.state.password);
  }

  render () {
    return (
      <div className = "Login">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group className="form-group row" controlId="formBasicUsername">
            <Form.Label className="col-sm-2 col-form-label">Username</Form.Label>
            <Form.Control className="col-sm-5" placeholder="Username" required="required" onChange={this.changeHandlerUsername.bind(this)}/>
          </Form.Group>

          <Form.Group className="form-group row" controlId="formBasicPassword">
            <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
            <Form.Control  className="col-sm-5" type="password" placeholder="Password" required="required" onChange={this.changeHandlerPassword.bind(this)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}