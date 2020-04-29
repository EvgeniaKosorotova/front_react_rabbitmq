import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export class NavMenu extends Component {
  render () {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Message sending application</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/messages">Sending</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}