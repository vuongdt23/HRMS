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
import RequestRespondForm from './RequestRespondform';

class RequestView extends Component {
  static contextType = userContext;

  constructor (props) {
    super (props);
    this.state = {
      requestData: [],
      isAddModalOpen: false,
      selectedRequestIndex: null,
      isDeleteModalOpen: false,
      isRespondModalOpen: false,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onPayrollSubmit = this.onPayrollSubmit.bind (this);
    this.handleRespond = this.handleRespond.bind (this);
    this.toggleRespondModal = this.toggleRespondModal.bind (this);
    this.handleRespondButtonClick = this.handleRespondButtonClick.bind (this);
    //this.HandleEdit = this.HandleEdit.bind (this);
  }

  handleRespond (event) {
    event.preventDefault ();
    console.log (event.target[2].value);
    const {user, setUser} = this.context;
    axios
      .put (
        'http://localhost:3000/request/' + this.state.selectedRequestIndex,
        {
          resrespond: JSON.stringify (event.target[2].value),
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.loadRequestInfo ();
        this.toggleRespondModal ();
      }).catch(err=>{
        console.log(err);
      });
  }
  loadRequestInfo = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/request/', {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        this.setState ({requestData: response.data});
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

  toggleRespondModal () {
    this.setState ({
      isRespondModalOpen: !this.state.isRespondModalOpen,
    });
  }

  handleRespondButtonClick () {
    if (this.state.selectedRequestIndex == null) return;
    else {
      this.toggleRespondModal ();
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
    this.loadRequestInfo ();
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
      <div>
        <BootstrapTable
          search
          version="4"
          data={this.state.requestData}
          selectRow={{
            mode: 'radio',
            bgColor: 'gray',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelected, rowIndex, e) => {
              //  console.log (isSelected, row.id);
              if (isSelected)
                this.setState ({selectedRequestIndex: row.resid}, () => {
                  //  alert (this.state.selectedPosIndex);
                });
              else {
                this.setState ({selectedRequestIndex: null}, () => {
                  //   alert (this.state.selectedPosIndex);
                });
              }
            },
          }}
        >
          <TableHeaderColumn hidden isKey dataField="resid"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="restitle"> Title</TableHeaderColumn>
          <TableHeaderColumn dataField="name"> By</TableHeaderColumn>
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
            color="warning"
            onClick={this.handleRespondButtonClick}
          >
            {' '}Respond{' '}
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
          isOpen={this.state.isRespondModalOpen}
          size="lg"
          id="Edit"
        >
          <RequestRespondForm
            handleRespond={this.handleRespond}
            reqid={this.state.selectedRequestIndex}
            onEditFormClose={this.toggleRespondModal}
          />
        </Modal>

      </div>
    );
  }
}
export default RequestView;
