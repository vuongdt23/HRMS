import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {
  Table,
  tr,
  td,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import DepartmentForm from './DepartmentForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import DepartmentEditForm from './DepartmentEditForm';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class DepartmentView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      departmentData: [],
      isAddModalOpen: false,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      SelectedDepIndex: null,
    };
    this.onCancel = this.onCancel.bind (this);
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onDepartmentSubmit = this.onDepartmentSubmit.bind (this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind (this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind (this);
    this.handleDelete = this.handleDelete.bind (this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);

  }
  static contextType = userContext;
  handleDeleteButtonClick () {
    if (this.state.SelectedDepIndex == null) return;
    else this.toggleDeleteModal ();
  }
  handleEditButtonClick (event) {
    if (this.state.SelectedDepIndex == null) return;
    else this.toggleEditModal ();
  }
  handleDelete () {
    const {user, setUser} = this.context;
    axios
      .delete (
        'http://localhost:3000/departments/' + this.state.SelectedDepIndex,
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadDepartmentInfo ();
        this.toggleDeleteModal ();
      });
  }
  onDepartmentSubmit (event) {
    event.preventDefault ();
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
        'http://localhost:3000/departments/',
        {
          depname: event.target[0].value,
          depdescr: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (this.LoadDepartmentInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  LoadDepartmentInfo = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/departments/', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        this.setState ({departmentData: response.data});
      })
      .catch (error => {
        console.log (error);
      });
  };
  toggleAddModal () {
    this.setState ({
      isAddModalOpen: !this.state.isAddModalOpen,
    });
  }
  toggleDeleteModal () {
    this.setState ({
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    });
  }
  onCancel () {
    this.toggleAddModal ();
  }
  toggleEditModal () {
    this.setState ({
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  }
  onDepartmentSubmit (event) {
    const {user, setUser} = this.context;
    console.log (user);
    event.preventDefault ();

    this.toggleAddModal ();
    console.log (event);
    axios
      .post (
        'http://localhost:3000/departments/',
        {
          depname: event.target[0].value,
          depdescr: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (this.LoadDepartmentInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  componentDidMount () {
    this.LoadDepartmentInfo ();
  }

  render () {
    return (
      <div className="container">
        <BootstrapTable
          selectRow={{
            mode: 'radio',
            bgColor: 'blue',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelected, rowIndex, e) => {
              //  console.log (isSelected, row.id);
              if (isSelected)
                this.setState ({SelectedDepIndex: row.depid}, () => {
                  //  alert (this.state.SelectedDepIndex);
                });
              else {
                this.setState ({SelectedDepIndex: null}, () => {
                  //    alert (this.state.SelectedDepIndex);
                });
              }
            },
          }}
          version="4"
          data={this.state.departmentData}
        >
          <TableHeaderColumn isKey dataField="depid"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="depname"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="depdescr">
            {' '}Description{' '}
          </TableHeaderColumn>

        </BootstrapTable>
        <div className="row">
          <Button
            className="col-2 mr-auto"
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
        >
          <DepartmentForm
            onDepartmentSubmit={this.onDepartmentSubmit}
            onCancel={this.onCancel}
          />
        </Modal>
        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isEditModalOpen}
          toggle={this.toggleAddModal}
          backdrop="static"
        >
          <DepartmentEditForm
            //handleEdit={this.handleEdit}
            DepartmentID={this.state.SelectedDepIndex}
            onEditFormClose={this.toggleEditModal}
          />
        </Modal>
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          size="sm"
          id="Confirm Delete"
          toggle={this.toggleDeleteModal}
        >
          <ModalHeader toggle={this.toggleDeleteModal}>

            Confirm Delete Department?
          </ModalHeader>

          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}>Confirm</Button>
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
export default DepartmentView;
