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
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }
  
  resetFields() {
    this.setState({
      exchange: '', 
      key: '', 
      message: '',
      formErrors: {exchange: '', key: '', message: ''},
      exchangeValid: false,
      keyValid: false,
      messageValid: false,
      isRedirect: false
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let exchangeValid = this.state.exchangeValid;
    let keyValid = this.state.keyValid;
    let messageValid = this.state.messageValid;

    switch (fieldName) {
      case 'exchange':
        exchangeValid = value.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9_]{0,}$/i) && value.length <= 30;
        fieldValidationErrors.exchange = exchangeValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'key':
        keyValid = value.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9_.]{0,}$/i) && value.length <= 30;
        fieldValidationErrors.key = keyValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'message':
        messageValid = true;
        fieldValidationErrors.message = messageValid ? '': `Field ${fieldName} is invalid`;
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
      exchangeValid: exchangeValid,
      keyValid: keyValid,
      messageValid: messageValid
    });
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
          this.resetFields();
        }
      }
      else {
        this.setRedirect();
      }
    }
    else {
      this.resetFields();
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <div className="Sending">
          <Form id="send-form" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicExchange">
              <Form.Label className="col-sm-2 col-form-label">Exchange</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Exchange" required 
                name="exchange"
                value={this.state.exchange}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.exchangeValid && this.state.formErrors.exchange}</span>
              </div>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicKey">
              <Form.Label className="col-sm-2 col-form-label">Key</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Key" required 
                name="key"
                value={this.state.key}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.keyValid && this.state.formErrors.key}</span>
              </div>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicMessage">
              <Form.Label className="col-sm-2 col-form-label">Message</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Message" required 
                name="message"
                value={this.state.message}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{!this.state.messageValid && this.state.formErrors.message}</span>
              </div>
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