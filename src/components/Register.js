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
      formErrors: {username: '', password: ''},
      usernameValid: true,
      passwordValid: true,
      isRedirect: false
    };
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }
  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.replace(/\s+/g, '').length > 0;
        fieldValidationErrors.username = usernameValid ? '' : `Field ${fieldName} is invalid`;
        break;
        /*
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
        */
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
    let isRedirect = await data.registerAsync(this.state.username, this.state.password);

    if (isRedirect) {
      this.setRedirect(isRedirect);
    }
    else {
      document.getElementById("register-form").reset();
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
              <Form.Control className="col-sm-5" placeholder="Username" required 
              name="username"
              value={this.state.username}
              onChange={this.handleInput.bind(this)}/>
              {!this.state.usernameValid && 
              <span className='error'>{this.state.formErrors.username}</span>}
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicPassword">
              <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
              <div className="col-sm-5">
                <Form.Control  className="col-sm-5" type="password" placeholder="Password" required 
                name="password"
                value={this.state.password}
                onChange={this.handleInput.bind(this)}/>
                {!this.state.passwordValid && 
                <span className='error'>{this.state.formErrors.password}</span>}
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