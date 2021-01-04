import React, {useContext, useState, Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button} from 'reactstrap';
import EmployeeForm from './EmployeeForm';
import DepartmentForm from './DepartmentForm';
class EmployeeList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isLoading: false,
      isLoaded: false,
      employees: null,
    };
  }

  static contextType = userContext;

  render (props) {
    return (
      <div>
       <DepartmentForm/>
      </div>
    );
  }
}

export default EmployeeList;
