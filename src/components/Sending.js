import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
//import { Redirect } from "react-router-dom";
import './style.css';
import sendService from './SendService';

export class Sending extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      exchange: '', 
      key: '', 
      message: '',
      formErrors: {exchange: '', key: '', message: ''},
      //isRedirect: false
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
      isRedirect: false
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'exchange':
        let exchangeValid = value.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9_]{0,}$/i) && value.length <= 30;
        fieldValidationErrors.exchange = exchangeValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'key':
        let keyValid = value.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9_.]{0,}$/i) && value.length <= 30;
        fieldValidationErrors.key = keyValid ? '' : `Field ${fieldName} is invalid`;
        break;
      case 'message':
        let messageValid = true;
        fieldValidationErrors.message = messageValid ? '': `Field ${fieldName} is invalid`;
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors});
  }
/*
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
*/
  async handleSubmit(event) {
    event.preventDefault();
    sendService.sendAsync(this.state.exchange, this.state.key, this.state.message);
    this.resetFields();
  }

  render () {
    return (
      <div>
        <div className="Sending">
          <Form id="send-form" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group className="form-group row" controlId="formBasicExchange">
              <Form.Label className="col-sm-2 col-form-label">Exchange</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Exchange" required 
                name="exchange"
                value={this.state.exchange}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{this.state.formErrors.exchange !== '' && this.state.formErrors.exchange}</span>
              </div>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicKey">
              <Form.Label className="col-sm-2 col-form-label">Key</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Key" required 
                name="key"
                value={this.state.key}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{this.state.formErrors.key !== '' && this.state.formErrors.key}</span>
              </div>
            </Form.Group>

            <Form.Group className="form-group row" controlId="formBasicMessage">
              <Form.Label className="col-sm-2 col-form-label">Message</Form.Label>
              <div className="col-sm-5">
                <Form.Control type="text" placeholder="Message" required 
                name="message"
                value={this.state.message}
                onChange={this.handleInput.bind(this)}/>
                <span className='error'>{this.state.formErrors.message !== '' && this.state.formErrors.message}</span>
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