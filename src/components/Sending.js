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
      formErrors: {exchange: '', key: '', message: ''},
      exchangeValid: false,
      keyValid: false,
      messageValid: false,
      isRedirect: false
    };
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
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
    let accessToken = data.getField('accessToken');
    let response = await fetch(`${config.URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "exchange": this.state.exchange,
          "key": this.state.key,
          "message": this.state.message
        })
    });

    if (response.status === 401) {
      let refreshToken = data.getField('refreshToken');

      if (refreshToken !== null && refreshToken !== undefined) {
        if (await data.refreshAsync()) {
          this.handleSubmit(event);
        }
        else {
          document.getElementById("send-form").reset();
        }
      }
      else {
        this.setRedirect();
      }
    }

    //document.getElementById("send-form").reset();
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <div className="Sending">
          <Form id="send-form" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicExchange">
              <Form.Label className="col-sm-2 col-form-label">Exchange</Form.Label>
              <Form.Control className="col-sm-5" placeholder="Exchange" required 
              name="exchange"
              value={this.state.exchange}
              onChange={this.handleInput.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicKey">
              <Form.Label className="col-sm-2 col-form-label">Key</Form.Label>
              <Form.Control  className="col-sm-5" type="text" placeholder="Key" required 
              name="key"
              value={this.state.key}
              onChange={this.handleInput.bind(this)}/>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicMessage">
              <Form.Label className="col-sm-2 col-form-label">Message</Form.Label>
              <Form.Control  className="col-sm-5" type="text" placeholder="Message" required 
              name="message"
              value={this.state.message}
              onChange={this.handleInput.bind(this)}/>
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