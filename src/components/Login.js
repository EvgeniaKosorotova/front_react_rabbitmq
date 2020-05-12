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
      redirect: ''
    };
  }

  changeHandlerUsername = (event) => {
    this.setState({username: event.target.value});
  }

  changeHandlerPassword = (event) => {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    await data.login(this.state.username, this.state.password);
    this.setRedirect("messages");
  }

  setRedirect = (name = "register") => {
    this.setState({
      redirect: name
    })
  }

  renderRedirect = () => {
    switch(this.state.redirect) {
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
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicUsername">
              <Form.Label className="col-sm-2 col-form-label">Username</Form.Label>
              <Form.Control className="col-sm-5" placeholder="Username" required="required" onChange={this.changeHandlerUsername.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicPassword">
              <Form.Label className="col-sm-2 col-form-label">Password</Form.Label>
              <Form.Control  className="col-sm-5" type="password" placeholder="Password" required="required" onChange={this.changeHandlerPassword.bind(this)}/>
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