import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
import {Table, tr, td, Button, Modal} from 'reactstrap';
import PositionForm from './PositionForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class PositionList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      positionData: [],
      isAddModalOpen: false,
    };
    this.toggleAddModal = this.toggleAddModal.bind (this);
    this.onPositionSubmit = this.onPositionSubmit.bind (this);
  }
  static contextType = userContext;

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
    return (
      <div>
        <BootstrapTable version="4" data={this.state.positionData}>
          <TableHeaderColumn isKey dataField="posid"> ID</TableHeaderColumn>
          <TableHeaderColumn dataField="posname"> Name</TableHeaderColumn>
          <TableHeaderColumn dataField="posdescr">
            {' '}Description{' '}
          </TableHeaderColumn>

        </BootstrapTable>
        <Button color="primary" onClick={this.toggleAddModal}> Add </Button>

        <Modal
          size="lg"
          id="AddModal"
          isOpen={this.state.isAddModalOpen}
          toggle={this.toggleAddModal}
        >
          <PositionForm onPositionSubmit={this.onPositionSubmit}/>
        </Modal>
        <Modal size="lg" id="Edit">
          <div />{' '}
        </Modal>
      </div>
    );
  }
}
export default PositionList;
