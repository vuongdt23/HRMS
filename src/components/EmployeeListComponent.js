import React, {useContext, useState, Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalFooter} from 'reactstrap';
import EmployeeForm from './EmployeeForm';
import EmployeeEditForm from './EmployeeEditForm';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class EmployeeList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      employee: [],
      isAddModalOpen: false,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      SelectedEmployeeIndex: null,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.toggleEditModal = this.toggleEditModal.bind (this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind (this);
    this.onFormClose = this.onFormClose.bind (this);
    this.onEditFormClose = this.onEditFormClose.bind (this);
    this.onEmployeeSubmit = this.onEmployeeSubmit.bind (this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);
    this.handleSelection = this.handleSelection.bind (this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind (this);
    this.handleDelete = this.handleDelete.bind (this);
    this.handleEdit = this.handleEdit.bind (this);
  }
  handleEdit (event) {
    const {user, setUser} = this.context;
    event.preventDefault ();

    console.log ('value', {
      name: event.target[0].value,
      address: event.target[1].value,
      email: event.target[2].value,
      phone: event.target[3].value,
      department: event.target[4].value,
      position: event.target[5].value,
      payroll: event.target[6].value,
    });

    axios
      .put (
        'http://localhost:3000/employees/' + this.state.SelectedEmployeeIndex,
        {
          name: event.target[0].value,
          address: event.target[1].value,
          email: event.target[2].value,
          phone: event.target[3].value,
          department: event.target[4].value,
          position: event.target[5].value,
          payroll: event.target[6].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.toggleEditModal ();
        this.LoadEmployeesInfo ();
       
      })
      .catch (err => {
        console.log (err);
      });
  }
  handleDelete () {
    const {user, setUser} = this.context;
    axios
      .delete (
        'http://localhost:3000/employees/' + this.state.SelectedEmployeeIndex,
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadEmployeesInfo ();
        this.toggleDeleteModal ();
      });
  }
  handleEditButtonClick (event) {
    if (this.state.SelectedEmployeeIndex == null) return;
    else this.toggleEditModal ();
  }
  handleSelection (row, isSelect, rowIndex, e) {
    this.setState ({editUserIndex: row.name});
    console.log ('index', this.state.editUserIndex);
    console.log ('row', row);
  }
  handleDeleteButtonClick () {
    if (this.state.SelectedEmployeeIndex == null) return;
    else this.toggleDeleteModal ();
  }
  toggleDeleteModal () {
    this.setState ({
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    });
  }
  toggleAddModal () {
    this.setState ({
      isAddModalOpen: !this.state.isAddModalOpen,
    });
    //console.log ('AAAAAAAAAAAAAAAA');
  }
  onEditFormClose () {
    this.toggleEditModal ();
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
    console.log ('value', {
      name: event.target[0].value,
      address: event.target[1].value,
      email: event.target[2].value,
      phone: event.target[3].value,
      department: event.target[4].value,
      position: event.target[5].value,
      payroll: event.target[6].value,
    });

    axios
      .post (
        'http://localhost:3000/employees/',
        {
          name: event.target[0].value,
          address: event.target[1].value,
          email: event.target[2].value,
          phone: event.target[3].value,
          department: event.target[4].value,
          position: event.target[5].value,
          payroll: event.target[6].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (this.LoadEmployeesInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  onEmployeeEditSubmit (event) {
    const {user, setUser} = this.context;
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
    if (!this.context.user.isLoggedin || this.context.user.permission!= 'admin')
    return (
      <div>
        Someone is lost
      </div>
    );
    else
    return (
      <div className="container">
        <BootstrapTable
          search
          selectRow={{
            mode: 'radio',
            bgColor: 'gray',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelected, rowIndex, e) => {
              //  console.log (isSelected, row.id);
              if (isSelected)
                this.setState ({SelectedEmployeeIndex: row.id}, () => {
                  //alert (this.state.SelectedEmployeeIndex);
                });
              else {
                this.setState ({SelectedEmployeeIndex: null}, () => {
                  // alert (this.state.SelectedEmployeeIndex);
                });
              }
            },
          }}
          on
          version="4"
          data={this.state.employee}
        >
          <TableHeaderColumn hidden isKey dataField="id"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email"> Email</TableHeaderColumn>
          <TableHeaderColumn dataField="address"> Address</TableHeaderColumn>
          <TableHeaderColumn dataField="depname"> Department</TableHeaderColumn>
          <TableHeaderColumn dataField="posname"> Position</TableHeaderColumn>
          <TableHeaderColumn dataField="amount"> Salary</TableHeaderColumn>
        </BootstrapTable>
        <div className="row mt-3">
          <Button
            className="col-2 ml-auto mr-auto"
            color="primary"
            onClick={this.toggleAddModal}
          >
            {' '}Add{' '}
          </Button>
          <Button
            className="col-2 mr-auto"
            color="danger"
            onClick={this.handleDeleteButtonClick}
          >
            {' '}Delete{' '}
          </Button>
          <Button
            className="col-2 mr-auto"
            color="secondary"
            onClick={this.handleEditButtonClick}
          >
            
            {' '}Edit{' '}
          </Button>
        </div>
        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isAddModalOpen}
          toggle={this.toggleAddModal}
          backdrop="static"
        >
          <EmployeeForm
            onEmployeeSubmit={this.onEmployeeSubmit}
            onFormClose={this.onFormClose}
          />
        </Modal>
        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isEditModalOpen}
          toggle={this.toggleAddModal}
          backdrop="static"
        >
          <EmployeeEditForm
            handleEdit={this.handleEdit}
            EmployeeID={this.state.SelectedEmployeeIndex}
            onEditFormClose={this.onEditFormClose}
          />
        </Modal>

        <Modal
          isOpen={this.state.isDeleteModalOpen}
          size="sm"
          id="Confirm Delete"
        >
          <ModalHeader toggle={this.toggleDeleteModal}>

            Confirm Delete Employee?
          </ModalHeader>

          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}> Confirm</Button>
            {' '}
            <Button color="secondary" onClick={this.toggleDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EmployeeList;
