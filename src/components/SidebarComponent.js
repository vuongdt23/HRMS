import React from 'react';
import userContext from '../context/usercontext';
import {useContext} from 'react';
import {NavItem, Nav, Alert} from 'reactstrap';
import classNames from 'classnames';
import {NavLink, Link} from 'react-router-dom';

const SideBar = ({isOpen, toggle}) => {
  const user = useContext (userContext);
  if (!user.user.isLoggedin)
    return (
      <div className={classNames ('sidebar', {'is-open': isOpen})}>
        <Alert color="warning">
         You are not logged in, Login to acccess more functionalities
        </Alert>
      </div>
    );
  else if (user.user.permission == 'admin')
    return (
      <div className={classNames ('sidebar', {'is-open': isOpen})}>
        <div className="sidebar-header">
          <span color="info" onClick={toggle} style={{color: '#fff'}}>
            &times;
          </span>
          <h3>Navigation</h3>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <NavItem>
              <NavLink className="nav-link" to="/Employees">
                <span className="fa fa-address-card fa-lg" /> Employees
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/Departments">
                <span className="fa fa-sitemap fa-lg" />   Departments
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/Positions">
                <span className="fa fa-space-shuttle fa-lg" />  Position
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/Payroll">
                <span className="fa fa-dollar fa-lg" />    Payroll
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/request">
                <span className="fa fa-comment fa-lg" /> Requests
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    );
  else
    return (
      <div className={classNames ('sidebar', {'is-open': isOpen})}>
        <div className="sidebar-header">
          <span color="info" onClick={toggle} style={{color: '#fff'}}>
            &times;
          </span>
          <h3>Navigation</h3>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">

            <NavItem>
              <NavLink className="nav-link" to="/Myprofile">
                <span className="fa fa-user fa-lg" /> My profile
              </NavLink>
            </NavItem>

          </Nav>
        </div>
      </div>
    );
};

export default SideBar;
