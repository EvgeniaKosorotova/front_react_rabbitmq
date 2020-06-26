import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import dataService from '../services/DataService';
import {config} from '../config';

export class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
        roleId : dataService.getField('roleId')
    };
  }

  componentDidMount() {
    let roleId = dataService.getField('roleId');
    
    if (roleId != 'null') {
      this.setState({
        roleId : roleId
      });
    }
  }

  render () {

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Message sending application</Navbar.Brand>
          <Nav>
            <Nav.Link href="/messages">Sending</Nav.Link>
            {this.state.roleId == config.adminId && <Nav.Link href="/users">User's panel</Nav.Link>}
          </Nav>
        </Navbar>
      </div>
    );
  }
}