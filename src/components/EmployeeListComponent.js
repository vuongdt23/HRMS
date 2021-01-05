import React, {useContext, useState, Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Button, Modal, ModalHeader, ModalFooter} from 'reactstrap';
import EmployeeForm from './EmployeeForm';
import EmployeeEditForm from './EmployeeEditForm';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {el} from 'date-fns/locale';

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
    this.onEmployeeSubmit = this.onEmployeeSubmit.bind (this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);
    this.handleSelection = this.handleSelection.bind (this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind (this);
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
        <BootstrapTable
          search
          selectRow={{
            mode: 'radio',
            bgColor: 'blue',
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
          <TableHeaderColumn isKey dataField="id"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email"> Email</TableHeaderColumn>
          <TableHeaderColumn dataField="address"> Address</TableHeaderColumn>

        </BootstrapTable>
        <Button color="primary" onClick={this.toggleAddModal}> Add </Button>
        <Button color="danger" onClick={this.handleDeleteButtonClick}>
          {' '}Delete{' '}
        </Button>
        <Button color="secondary" onClick={this.handleEditButtonClick}>
          {' '}Edit{' '}
        </Button>
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
        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isEditModalOpen}
          toggle={this.toggleAddModal}
        >
          <EmployeeEditForm
            EmployeeID = {this.state.SelectedEmployeeIndex}
            
          />
        </Modal>
        
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          size="sm"
          id="Confirm Delete"
        >
          <ModalHeader toggle={this.toggleEditModal}>

            Confirm Delete Employee?
          </ModalHeader>

          <ModalFooter>
            <Button color="danger">Confirm</Button>{' '}
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
