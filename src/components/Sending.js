import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './style.css';
import {config} from '../config';
import data from './Data';

export class Sending extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      exchange: '', 
      key: '', 
      message: '',
      isRedirect: false
    };
  }

  changeHandlerExchange = (event) => {
    this.setState({exchange: event.target.value});
  }

  changeHandlerKey = (event) => {
    this.setState({key: event.target.value});
  }

  changeHandlerMessage = (event) => {
    this.setState({message: event.target.value});
  }

  setRedirect = () => {
    this.setState({
      isRedirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.isRedirect) {
      return <Redirect to='/login' />;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let response = await fetch(`${config.URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.currentUser.accessToken}`
        },
        body: {
          "exchange": this.state.exchange,
          "key": this.state.key,
          "message": this.state.message
        }
    });

    if (response.status === 401) {
      if (data.currentUser.refreshToken !== null) {
        data.refreshAsync();
        this.handleSubmit(event);
      }
      else {
        this.setRedirect();
      }
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <div className="Sending">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicExchange">
              <Form.Label className="col-sm-2 col-form-label">Exchange</Form.Label>
              <Form.Control className="col-sm-5" placeholder="Exchange" onChange={this.changeHandlerExchange.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicKey">
              <Form.Label className="col-sm-2 col-form-label">Key</Form.Label>
              <Form.Control  className="col-sm-5" type="text" placeholder="Key" onChange={this.changeHandlerKey.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicMessage">
              <Form.Label className="col-sm-2 col-form-label">Message</Form.Label>
              <Form.Control  className="col-sm-5" type="text" placeholder="Message" onChange={this.changeHandlerMessage.bind(this)}/>
            </Form.Group>

            <Button className="button" variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}