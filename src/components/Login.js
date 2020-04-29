import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';

export class Login extends Component {
  state = { username: '', password: '' };

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
    fetch('http://localhost:52/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            "username": this.state.username,
            "password": this.state.password
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render () {
    return (
      <div className = "Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="form-group row" controlId="formBasicUsername">
            <Form.Label className="col-sm-2 col-form-label">Username</Form.Label>
            <Form.Control className="col-sm-5" placeholder="Username" onChange={this.changeHandlerUsername}/>
          </Form.Group>

          <Form.Group className="form-group row" controlId="formBasicPassword">
            <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
            <Form.Control  className="col-sm-5" type="password" placeholder="Password"  onChange={this.changeHandlerPassword}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}