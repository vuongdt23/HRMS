import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button, Modal} from 'reactstrap';
import DepartmentForm from './DepartmentForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class DepartmentView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      departmentData: [],
      isAddModalOpen: false,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onDepartmentSubmit = this.onDepartmentSubmit.bind (this);
  }
  static contextType = userContext;

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
          name: event.target[0].value,
          descr: event.target[1].value,
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
      <div>
        <BootstrapTable version="4" data={this.state.departmentData}>
          <TableHeaderColumn isKey dataField="id"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="descr"> Description </TableHeaderColumn>

        </BootstrapTable>
        <Button color="primary" onClick={this.toggleAddModal}> Add </Button>

        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isAddModalOpen}
          toggle={this.toggleAddModal}
        >
          <DepartmentForm onDepartmentSubmit={this.onDepartmentSubmit} />
        </Modal>
        <Modal size="lg" id="Edit">
          <div />{' '}
        </Modal>
      </div>
    );
  }
}
export default DepartmentView;
