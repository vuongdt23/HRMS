import React, {useContext, useState, Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button, Modal} from 'reactstrap';
import EmployeeForm from './EmployeeForm';
import DepartmentForm from './DepartmentForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap-table/4.3.1/react-bootstrap-table-all.min.css'
class EmployeeList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      employee: [],
      isAddModalOpen: false,
      isEditModalOpen: false,
      editUserIndex: 0,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.toggleEditModal = this.toggleEditModal.bind (this);
    this.onFormClose = this.onFormClose.bind (this);
    this.onEmployeeSubmit = this.onEmployeeSubmit.bind (this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);
  }
  handleEditButtonClick (event) {
    this.setState ({editUserIndex: event.target.id});
  }
  renderPerson (employee, index) {
    return (
      <tr key={index}>
        <td>{employee.name}</td>
        <td>{employee.address}</td>
        <td>{employee.phone}</td>
        <td>{employee.email}</td>
        <Button id={index} onClick={e => this.handleEditButtonClick (e)}>
          {' '}Edit{' '}
        </Button>
      </tr>
    );
  }
  toggleAddModal () {
    this.setState ({
      isAddModalOpen: !this.state.isAddModalOpen,
    });
    console.log ('AAAAAAAAAAAAAAAA');
  }
  toggleEditModal () {
    this.setState ({
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  }
  onFormClose () {
    this.toggleAddModal ();
  }
  onEmployeeSubmit (event) {
    const {user, setUser} = this.context;
    event.preventDefault ();

    this.toggleAddModal ();
    console.log (event);
    let body = {
      name: event.target[0].value,
      address: event.target[1].value,
      email: event.target[2].value,
      phone: event.target[3].value,
      department: event.target[4].value,
      position: event.target[5].value,
    };
    axios
      .post ('http://localhost:3000/employees', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
        name: event.target[0].value,
        address: event.target[1].value,
        email: event.target[2].value,
        phone: event.target[3].value,
        department: event.target[4].value,
        position: event.target[5].value,
      })
      .then (this.LoadEmployeesInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  static contextType = userContext;
  LoadEmployeesInfo = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/employees/', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        this.setState ({employee: response.data});
      })
      .catch (error => {
        console.log (error);
      });
  };
  componentDidMount () {
    this.LoadEmployeesInfo ();
  }
  render () {
    return (
      <div>
        <BootstrapTable  version='4' data={this.state.employee}>
        <TableHeaderColumn isKey dataField='id'> ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'> Name</TableHeaderColumn>
        <TableHeaderColumn dataField='email'> Email</TableHeaderColumn>
        <TableHeaderColumn dataField='address'> Address</TableHeaderColumn>
        </BootstrapTable>
        <Button onClick={this.toggleAddModal}> Add </Button>
        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isAddModalOpen}
          toggle={this.toggleAddModal}
        >
          <EmployeeForm
            onEmployeeSubmit={this.onEmployeeSubmit}
            onFormClose={this.onFormClose}
          />
        </Modal>
        <Modal size="lg" id="Edit">
          <div />{' '}
        </Modal>
      </div>
    );
  }
}

export default EmployeeList;
