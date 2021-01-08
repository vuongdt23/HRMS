import React, {Component} from 'react';
import axios from 'axios';

import {Card, Modal, CardTitle, CardBody, Label, Button} from 'reactstrap';
import userContext from '../context/usercontext';
import RequestForm from './RequestForm';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class EmployeeProfile extends Component {
  static contextType = userContext;

  state = {
    isSendRequestModalOpen: false,
    isViewRequestModalOpen: false,
    Employee: '',
    Request: '',
  };

  toggleViewRequestModal = () => {
    this.setState ({
      isViewRequestModalOpen: !this.state.isViewRequestModalOpen,
    });
  };
  toggleRequestModal = () => {
    this.setState ({
      isSendRequestModalOpen: !this.state.isSendRequestModalOpen,
    });
  };
  handleRequestSend = event => {
    const {user, setUser} = this.context;
    console.log (user);
    event.preventDefault ();

    console.log (event);
    axios
      .post (
        'http://localhost:3000/request/employees/' + user.id,
        {
          restitle: event.target[0].value,
          resdescr: event.target[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      )
      .then (res => {
        this.toggleRequestModal ();
      })
      .catch (err => {
        console.log (err);
      });
  };
  loadRequest = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/request/employees/' + user.id, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        console.log (response.data);
        this.setState ({Request: response.data}, () => {
          //  lert (this.state.Request);
        });
      })
      .catch (error => {
        console.log (error);
      });
  };
  loadEmployee = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/employees/' + user.id, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        console.log (response.data[0]);
        this.setState ({Employee: response.data[0]}, () => {});
      })
      .catch (error => {
        console.log (error);
      });
  };

  componentWillMount () {
    this.loadEmployee ();
    this.loadRequest ();
  }

  render () {
    return (
      <div>
        <Card>
          <CardTitle tag="h2" className="text-center">User Profile </CardTitle>
          <CardBody>
            <div className="row">
              <div className="col-2"> Name</div>
              <p className="col-6" id="name"> {this.state.Employee.name}</p>
            </div>
            <div className="row">
              <div className="col-2"> Department</div>
              <p className="col-6" id="name"> {this.state.Employee.depname}</p>
            </div>
            <div className="row">
              <div className="col-2 font-weight-bold"> Salary</div>
              <p className="col-6" id="name"> {this.state.Employee.amount}</p>
            </div>
            <div className="row">
              <div className="col-2"> Position</div>
              <p className="col-6" id="name"> {this.state.Employee.posname}</p>
            </div>
            <div className="row">
              <div className="col-2"> Email</div>
              <p className="col-6" id="name"> {this.state.Employee.email}</p>
            </div>
            <div className="row">
              <div className="col-2"> Phone</div>
              <p className="col-6" id="name"> {this.state.Employee.phone}</p>
            </div>
            <div className="row">
              <div className="col-2"> Address</div>
              <p className="col-6" id="name"> {this.state.Employee.address}</p>
            </div>

          </CardBody>
        </Card>
        <Button onClick={this.toggleRequestModal}> Send Request</Button>
        <Button onClick={this.toggleViewRequestModal}> My Requests</Button>
        <Modal isOpen={this.state.isSendRequestModalOpen}>
          <RequestForm onSubmit={this.handleRequestSend} />
        </Modal>

        <Modal isOpen={this.state.isViewRequestModalOpen}>
          <BootstrapTable version="4" data={this.state.Request}>
            <TableHeaderColumn sort isKey dataField="resid">
              {' '}ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="restitle"> Title</TableHeaderColumn>
            <TableHeaderColumn dataField="resdescr">
              {' '}Description{' '}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="resrespond">
              {' '}Respond
            </TableHeaderColumn>
          </BootstrapTable>

          <Button color="primary" onClick={this.toggleViewRequestModal}> Back</Button>
        </Modal>
      </div>
    );
  }
}

export default EmployeeProfile;
