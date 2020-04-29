import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export default class Layout extends Component {
  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
