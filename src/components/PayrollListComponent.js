import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {
  Table,
  tr,
  td,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import PayrollForm from './PayrollForm';
import PayrollEditForm from './PayrollEditForm';
class PayrollList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      payrollData: [],
      isAddModalOpen: false,
      selectedPayrollIndex: null,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onPayrollSubmit = this.onPayrollSubmit.bind (this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind (this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind (this);
    this.toggleEditModal = this.toggleEditModal.bind (this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind (this);
    this.HandleEdit = this.HandleEdit.bind (this);
    this.handleDelete = this.handleDelete.bind (this);
  }
  static contextType = userContext;
  handleDelete () {
    const {user, setUser} = this.context;
    axios
      .delete (
        'http://localhost:3000/payroll/' + this.state.selectedPayrollIndex,
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadPayrollInfo ();
        this.toggleDeleteModal ();
      });
  }
  HandleEdit (event) {
    event.preventDefault ();
    const {user, setUser} = this.context;
    axios
      .put (
        'http://localhost:3000/payroll/' + this.state.selectedPayrollIndex,
        {
          amount: event.target[1].value,
          payrolldescr: event.target[0].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.LoadPayrollInfo ();
        this.toggleEditModal ();
      });
  }
  LoadPayrollInfo = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/payroll/', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        this.setState ({payrollData: response.data});
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
    if (this.state.selectedPayrollIndex == null) return;
    else {
      this.toggleDeleteModal ();
      // alert ('AAAAAAAAAAA');
    }
  }
  handleEditButtonClick () {
    if (this.state.selectedPayrollIndex == null) return;
    else {
      this.toggleEditModal ();
      //  alert ('AAAAAAAAAAA');
    }
  }
  onPayrollSubmit (event) {
    const {user, setUser} = this.context;
    console.log (user);
    event.preventDefault ();

    this.toggleAddModal ();
    console.log (event);
    axios
      .post (
        'http://localhost:3000/payroll/',
        {
          payrolldescr: event.target[0].value,
          amount: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (this.LoadPayrollInfo ())
      .catch (err => {
        console.log (err);
      });
  }
  componentDidMount () {
    this.LoadPayrollInfo ();
  }

  render () {
    if (
      !this.context.user.isLoggedin ||
      this.context.user.permission != 'admin'
    )
      return (
        <div>
          Someone is lost
        </div>
      );
    else
      return (
        <div>
          <BootstrapTable
            search
            version="4"
            data={this.state.payrollData}
            selectRow={{
              mode: 'radio',
              bgColor: 'gray',
              clickToSelect: true,
              hideSelectColumn: true,
              onSelect: (row, isSelected, rowIndex, e) => {
                //  console.log (isSelected, row.id);
                if (isSelected)
                  this.setState ({selectedPayrollIndex: row.payrollid}, () => {
                    //  alert (this.state.selectedPosIndex);
                  });
                else {
                  this.setState ({selectedPayrollIndex: null}, () => {
                    //   alert (this.state.selectedPosIndex);
                  });
                }
              },
            }}
          >
            <TableHeaderColumn isKey dataField="payrollid">
              {' '}ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="payrolldescr"> Pay</TableHeaderColumn>
            <TableHeaderColumn dataField="amount">
              {' '}Amount{' '}
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
            size="lg"
            id="AddModal"
            isOpen={this.state.isAddModalOpen}
            toggle={this.toggleAddModal}
          >
            {' '}<PayrollForm onPayrollSubmit={this.onPayrollSubmit} />
          </Modal>

          <Modal
            toggle={this.toggleEditModal}
            isOpen={this.state.isEditModalOpen}
            size="lg"
            id="Edit"
          >
            <PayrollEditForm
              HandleEdit={this.HandleEdit}
              onEditFormClose={this.toggleEditModal}
              payrollID={this.state.selectedPayrollIndex}
            />
          </Modal>

          <Modal
            isOpen={this.state.isDeleteModalOpen}
            size="sm"
            id="Confirm Delete"
            toggle={this.toggleDeleteModal}
          >
            <ModalHeader toggle={this.toggleDeleteModal}>

              Confirm Delete Salary?
            </ModalHeader>

            <ModalFooter>
              <Button color="danger" onClick={this.handleDelete}>
                Confirm
              </Button>
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
export default PayrollList;
