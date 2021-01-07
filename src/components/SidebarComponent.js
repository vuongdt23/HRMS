import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

import {NavItem, Nav} from 'reactstrap';
import classNames from 'classnames';
import {NavLink, Link} from 'react-router-dom';

import SubMenu from './SubMenu';

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
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Home 2',
      target: 'Home-2',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: 'Page 1',
      target: 'Page-1',
    },
    {
      title: 'Page 2',
      target: 'Page-2',
    },
  ],
];

export default SideBar;
