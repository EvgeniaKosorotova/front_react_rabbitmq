import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './style.css';
import data from './Data';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '', 
      password: '',
      repeatPassword: '',
      formErrors: {username: '', password: '', repeatPassword: ''},
      usernameValid: true,
      passwordValid: true,
      repeatPasswordValid: true,
      isRedirect: false
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
      repeatPassword: '',
      formErrors: {username: '', password: '', repeatPassword: ''},
      usernameValid: true,
      passwordValid: true,
      repeatPasswordValid: true,
      isRedirect: false
    });
  }
  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let repeatPasswordValid = this.state.repeatPasswordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.replace(/\s+/g, '').length > 0;
        fieldValidationErrors.username = usernameValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': `Field ${fieldName} is too short`;
        break;
      case 'repeatpassword':
        repeatPasswordValid = value === this.state.password;
        fieldValidationErrors.repeatPassword = repeatPasswordValid ? '': `Values do not match`;
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid,
      repeatPasswordValid: repeatPasswordValid
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let isRedirect = await data.registerAsync(this.state.username, this.state.password);

    if (isRedirect) {
      this.setRedirect(isRedirect);
    }
    else {
      this.resetFields();
    }
  }

  setRedirect = (isRedirect) => {
    this.setState({
      isRedirect: isRedirect
    })
  }

  renderRedirect = () => {
    if (this.state.isRedirect) {
      return <Redirect to='/login' />;
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <div className = "Register">
          <Form id="register-form" onSubmit={this.handleSubmit.bind(this)}>
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

            <Form.Group className="form-group row" controlId="formBasicRepeatPassword">
              <Form.Label className="col-sm-2 col-form-label">Repeat password</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="password" placeholder="Repeat password" required 
                name="repeatPassword"
                value={this.state.repeatPassword}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.repeatPasswordValid && this.state.formErrors.repeatPassword}</span>
              </div>
            </Form.Group>

            <Button className="button" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}