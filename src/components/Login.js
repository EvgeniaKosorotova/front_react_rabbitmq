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
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }
  
  resetFields() {
    this.setState({
      username: '', 
      password: '',
      formErrors: {username: '', password: ''},
      usernameValid: false,
      passwordValid: false,
      redirectName: ''
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.replace(/\s+/g, '').length > 0;
        fieldValidationErrors.username = usernameValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': `Field ${fieldName} is too short`;
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let isRedirect = await data.loginAsync(this.state.username, this.state.password);

    if (isRedirect) {
      this.setRedirect("messages");
    }
    else {
      this.resetFields();
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
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Username" required 
                name="username"
                value={this.state.username}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.usernameValid && this.state.formErrors.username}</span>
              </div>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicPassword">
              <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="password" placeholder="Password" required 
                name="password"
                value={this.state.password}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.passwordValid && this.state.formErrors.password}</span>
              </div>
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