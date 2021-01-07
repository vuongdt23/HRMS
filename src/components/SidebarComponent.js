import React from 'react';

import {NavItem, Nav} from 'reactstrap';
import classNames from 'classnames';
import {NavLink, Link} from 'react-router-dom';

const SideBar = ({isOpen, toggle}) => (
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
            <span className="fa fa-sitemap fa-lg" />Departments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/Positions">
            <span className="fa fa-space-shuttle fa-lg" />Position
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/Payroll">
            <span className="fa fa-dollar fa-lg" />Payroll
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
