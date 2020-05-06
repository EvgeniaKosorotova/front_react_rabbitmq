import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import {config} from '../config';
import {tokenData} from './TokenData';

export class Sending extends Component {
  state = { exchange: '', key: '', message: '' };

  constructor(props) {
    super(props);
    this.changeHandlerExchange = this.changeHandlerExchange.bind(this); 
    this.changeHandlerKey = this.changeHandlerKey.bind(this); 
    this.changeHandlerMessage = this.changeHandlerMessage.bind(this); 
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

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${config}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.currentTokensValue.AccessToken}`
        },
        body: {
          "exchange": this.state.exchange,
          "key": this.state.key,
          "message": this.state.message
        }
    })
    .then((response) => {
        if (response.status === 401 && tokenData.currentTokensValue.RefreshToken !== null) {
          tokenData.refresh(tokenData.currentTokensValue.RefreshToken);
          this.handleSubmit(event);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render () {
    return (
      <div className="Sending">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="form-group row" controlId="formBasicExchange">
            <Form.Label className="col-sm-2 col-form-label">Exchange</Form.Label>
            <Form.Control className="col-sm-5" placeholder="Exchange" onChange={this.changeHandlerExchange}/>
          </Form.Group>

          <Form.Group className="form-group row" controlId="formBasicKey">
            <Form.Label className="col-sm-2 col-form-label">Key</Form.Label>
            <Form.Control  className="col-sm-5" type="text" placeholder="Key" onChange={this.changeHandlerKey}/>
          </Form.Group>

          <Form.Group className="form-group row" controlId="formBasicMessage">
            <Form.Label className="col-sm-2 col-form-label">Message</Form.Label>
            <Form.Control  className="col-sm-5" type="text" placeholder="Message" onChange={this.changeHandlerMessage}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
    );
  }
}