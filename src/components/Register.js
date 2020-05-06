import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import {userData} from './UserData';

export class Register extends Component {
  state = { username: '', password: '', };

  constructor(props) {
    super(props);
    this.changeHandlerUsername = this.changeHandlerUsername.bind(this); 
    this.changeHandlerPassword = this.changeHandlerPassword.bind(this); 
  }

  changeHandlerUsername = (event) => {
    this.setState({username: event.target.value});
  }

  changeHandlerPassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    userData.register(this.state.username, this.state.password);
  }

  render () {
    return (
      <div className = "Register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="form-group row" controlId="formBasicUsername">
            <Form.Label className="col-sm-2 col-form-label">Username</Form.Label>
            <Form.Control className="col-sm-5" placeholder="Username" required="required" onChange={this.changeHandlerUsername}/>
          </Form.Group>

          <Form.Group className="form-group row" controlId="formBasicPassword">
            <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
            <Form.Control  className="col-sm-5" type="password" placeholder="Password" 
              required="required" 
              onChange={this.changeHandlerPassword}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}