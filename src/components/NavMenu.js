import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import data from './Data';

export class NavMenu extends Component {
  render () {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Message sending application</Navbar.Brand>
          {
            data.currentUser.refreshToken !== "" &&
            <Nav className="mr-auto">
              <Nav.Link href="/messages">Sending</Nav.Link>
            </Nav>
          }
          {
            data.currentUser.refreshToken === "" &&
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