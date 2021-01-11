import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button, Modal, ModalFooter, ModalHeader} from 'reactstrap';
import PositionForm from './PositionForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import PositionEditForm from './PositionEditForm';
class PositionList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      positionData: [],
      isAddModalOpen: false,
      selectedPosIndex: null,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onPositionSubmit = this.onPositionSubmit.bind (this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind (this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind (this);
    this.toggleEditModal = this.toggleEditModal.bind (this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);
    this.HandleEdit = this.HandleEdit.bind (this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  static contextType = userContext;
  handleDelete () {
    const {user, setUser} = this.context;
    axios
      .delete (
        'http://localhost:3000/positions/' + this.state.selectedPosIndex,
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadPositionInfo ();
        this.toggleDeleteModal ();
      });
  }
  HandleEdit (event) {
    event.preventDefault ();
    const {user, setUser} = this.context;
    axios
      .put (
        'http://localhost:3000/positions/' + this.state.selectedPosIndex,
        {
          posname: event.target[0].value,
          posdescr: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadPositionInfo ();
        this.toggleEditModal ();
      });
  }
  LoadPositionInfo = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/positions/', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        this.setState ({positionData: response.data});
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

  toggleEditModal () {
    this.setState ({
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  }

  handleDeleteButtonClick () {
    if (this.state.selectedPosIndex == null) return;
    else {
      this.toggleDeleteModal ();
      // alert ('AAAAAAAAAAA');
    }
  }
  handleEditButtonClick () {
    if (this.state.selectedPosIndex == null) return;
    else {
      this.toggleEditModal ();
      //  alert ('AAAAAAAAAAA');
    }
  }
  onPositionSubmit (event) {
    const {user, setUser} = this.context;
    console.log (user);
    event.preventDefault ();

    this.toggleAddModal ();
    console.log (event);
    axios
      .post (
        'http://localhost:3000/positions/',
        {
          posname: event.target[0].value,
          posdescr: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (this.LoadPositionInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  componentDidMount () {
    this.LoadPositionInfo ();
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
          version="4"
          data={this.state.positionData}
          selectRow={{
            mode: 'radio',
            bgColor: 'gray',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelected, rowIndex, e) => {
              //  console.log (isSelected, row.id);
              if (isSelected)
                this.setState ({selectedPosIndex: row.posid}, () => {
                  //  alert (this.state.selectedPosIndex);
                });
              else {
                this.setState ({selectedPosIndex: null}, () => {
                  //   alert (this.state.selectedPosIndex);
                });
              }
            },
          }}
        >
          <TableHeaderColumn hidden isKey dataField="posid"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="posname"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="posdescr">
            {' '}Description{' '}
          </TableHeaderColumn>

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
          backdrop="static"
          size="lg"
          id="AddModal"
          isOpen={this.state.isAddModalOpen}
          toggle={this.toggleAddModal}
        >
          <PositionForm
            onPositionSubmit={this.onPositionSubmit}
            onCancel={this.toggleAddModal}
          />
        </Modal>

        <Modal
          backdrop="static"
          toggle={this.toggleEditModal}
          isOpen={this.state.isEditModalOpen}
          size="lg"
          id="Edit"
        >
          <PositionEditForm
            positionID={this.state.selectedPosIndex}
            HandleEdit={this.HandleEdit}
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

            Confirm Delete Position?
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
export default PositionList;
