import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './style.css';
import data from './Data'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      redirectName: ''
    };
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let isRedirect = await data.loginAsync(this.state.username, this.state.password);

    if (isRedirect) {
      this.setRedirect("messages");
    }
    else {
      document.getElementById("login-form").reset();
    }
  }

  setRedirect = (name) => {
    this.setState({
      redirectName: name
    })
  }

  renderRedirect = () => {
    switch(this.state.redirectName) {
      case "register":
        return <Redirect to='/register' />;
      case "messages":
        return <Redirect to='/messages' />;
      default:
        return <div/>;
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <div className = "Login">
          <Form id="login-form" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicUsername">
              <Form.Label className="col-sm-2 col-form-label">Username</Form.Label>
              <Form.Control className="col-sm-5" placeholder="Username" required 
              name="username"
              value={this.state.username}
              onChange={this.handleInput.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicPassword">
              <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
              <Form.Control  className="col-sm-5" type="password" placeholder="Password" required 
              name="password"
              value={this.state.password}
              onChange={this.handleInput.bind(this)}/>
            </Form.Group>

            <Button className="button" variant="primary" type="submit">
              Login
            </Button>

            <Button className="button" variant="primary" onClick={() => {this.setRedirect("register")}}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}