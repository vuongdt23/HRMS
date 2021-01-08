import React, {Component} from 'react';
import axios from 'axios';

import {Card, CardHeader, CardTitle, CardBody, Label} from 'reactstrap';
import userContext from '../context/usercontext';

class EmployeeProfile extends Component {
  static contextType = userContext;

  state = {
    Employee: '',
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
      </div>
    );
  }
}

export default EmployeeProfile;
