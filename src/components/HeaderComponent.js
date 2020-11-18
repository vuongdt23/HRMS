import React, {Component} from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  Media,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import {ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleNav = this.toggleNav.bind (this);
    this.toggleModal = this.toggleModal.bind (this);
    this.handleLogin = this.handleLogin.bind (this);
  }
  toggleNav () {
    this.setState ({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  toggleModal () {
    this.setState ({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleLogin (event) {
    this.toggleModal ();
    alert (
      'Username: ' +
        this.username.value +
        ' Password: ' +
        this.password.value +
        ' Remember: ' +
        this.remember.checked
    );
    event.preventDefault ();
  }
  render () {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container navbar-dark">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="/assets/iZPxFR.jpg"
                height="30"
                width="41"
                alt="Dunder Mifflin"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar className="align-item-center">
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/Apply">
                    <span className="fa fa-info fa-lg" /> Apply
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/Schedule">
                    <span className="fa fa-list fa-lg" /> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button color="primary" onClick={this.toggleModal}>
                    LOGIN

                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <Card>
            <CardHeader toggle={this.toggleModal} className="text-center">
              Login
            </CardHeader>
            <CardBody>

              <Form onSubmit={this.handleLogin}>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={input => (this.username = input)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={input => (this.password = input)}
                  />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="remember"
                      innerRef={input => (this.remember = input)}
                    />
                    Remember me
                  </Label>
                </FormGroup>
                <div className="row">
                  <Button type="submit" value="submit" color="primary">
                    Login
                  </Button>
                  <a href="#" class="ml-auto">Register here</a>
                </div>
              </Form>
            </CardBody>
          </Card> 
        </Modal>
      </React.Fragment>
    );
  }
}
export default Header;
