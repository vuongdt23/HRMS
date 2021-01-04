import React, {Component, useContext} from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  Alert,
} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import userContext from '../context/usercontext';
import axios from 'axios';

class Header extends Component {
  static contextType = userContext;

  constructor (props) {
    super (props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      isErrorShown: false,
    };
    this.toggleNav = this.toggleNav.bind (this);
    this.toggleModal = this.toggleModal.bind (this);
    this.handleLogin = this.handleLogin.bind (this);
    this.ShowError = this.ShowError.bind (this);
    this.handleLogout = this.handleLogout.bind (this);
  }
  handleLogout () {
    const {user, setUser} = this.context;
    const newuser = {
      isLoggedin: false,
    };
    setUser (newuser);
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
  ShowError () {
    this.setState ({
      isErrorShown: !this.state.isErrorShown,
    });
  }

  handleLogin (event) {
    const {user, setUser} = this.context;
    console.log ('oldcontext', this.context.user);
    axios
      .post ('http://localhost:3000/users/login', {
        username: this.username.value,
        password: this.password.value,
      })
      .then (res => {
        console.log (res.data);
        const newuser = {
          token: res.data.token,
          id: res.data.id,
          isLoggedin: true,
        };

        setUser (newuser);
        console.log ('New Context', this.context);
        console.log (this.context);
        this.toggleModal ();
      })
      .catch (err => {
        this.ShowError ();
        console.log ('login failed');
      });
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
                  <NavLink className="nav-link" to="/Employees">
                    <span className="fa fa-address-card fa-lg" /> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {this.context.user.isLoggedin
                    ? <Button onClick={this.handleLogout} color="danger">
                        <Link
                          to="/home"
                          style={{textDecoration: 'none', color: 'white'}}
                        >
                          LOGOUT
                        </Link>
                      </Button>
                    : <Button color="primary" onClick={this.toggleModal}>
                        {' '}LOGIN{' '}
                      </Button>}
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
          <Alert
            color="danger"
            isOpen={this.state.isErrorShown}
            toggle={this.ShowError}
          >
            Login Failed
          </Alert>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Header;
