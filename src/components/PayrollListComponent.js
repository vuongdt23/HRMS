import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button, Modal} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class PayrollList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      payrollData: [],
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
  }
  static contextType = userContext;

  HandleEdit (event) {
    event.preventDefault ();
    const {user, setUser} = this.context;
    axios
      .put (
        'http://localhost:3000/payroll/' + this.state.selectedPosIndex,
        {
          amount: event.target[0].value,
          payrolldescr: event.target[1].value,
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
        'http://localhost:3000/payrolls/',
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
    this.LoadPayrollInfo ();
  }

  render () {
    return (
      <div>
        <BootstrapTable
          version="4"
          data={this.state.payrollData}
          selectRow={{
            mode: 'radio',
            bgColor: 'blue',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelected, rowIndex, e) => {
              //  console.log (isSelected, row.id);
              if (isSelected)
                this.setState ({selectedPosIndex: row.payrollid}, () => {
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
          <TableHeaderColumn isKey dataField="payrollid"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="payrolldescr"> Pay</TableHeaderColumn>
          <TableHeaderColumn dataField="amount">
            {' '}Amount{' '}
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
        />

        <Modal
          toggle={this.toggleEditModal}
          isOpen={this.state.isEditModalOpen}
          size="lg"
          id="Edit"
        />
      </div>
    );
  }
}
export default PayrollList;
