import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import dataService from '../services/DataService';

export class NavMenu extends Component {
  render () {
    let refreshToken = dataService.getField('refreshToken');

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Message sending application</Navbar.Brand>
          {
          (refreshToken === null || refreshToken === undefined) ? 
          <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          :
          <Nav className="mr-auto">
            <Nav.Link href="/messages">Sending</Nav.Link>
          </Nav>
          }
        </Navbar>
      </div>
    );
  }
}