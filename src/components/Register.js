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
      isRedirect: false
    };
    this.changeHandlerUsername = this.changeHandlerUsername.bind(this); 
    this.changeHandlerPassword = this.changeHandlerPassword.bind(this); 
  }

  changeHandlerUsername = (event) => {
    this.setState({username: event.target.value});
  }

  changeHandlerPassword = (event) => {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let isRedirect = await data.registerAsync(this.state.username, this.state.password);
    this.setRedirect(isRedirect);
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

            <Button className="button" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}