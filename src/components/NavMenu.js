import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {tokenData} from './TokenData';

export class NavMenu extends Component {
  render () {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Message sending application</Navbar.Brand>
          {
            tokenData.currentTokensValue.RefreshToken !== null &&
            <Nav className="mr-auto">
              <Nav.Link href="/messages">Sending</Nav.Link>
            </Nav>
          }
          {
            tokenData.currentTokensValue.RefreshToken === null &&
            <Nav>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          }
        </Navbar>
      </div>
    );
  }
}