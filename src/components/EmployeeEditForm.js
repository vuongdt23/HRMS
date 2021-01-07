import React, {Component} from 'react';
import axios from 'axios';

import {Form, Button, Col, Row} from 'react-bootstrap';
import userContext from '../context/usercontext';

class EmployeeEditForm extends Component {
  static contextType = userContext;

  state = {
    roleData: [],
    positionData: [],
    departmentData: [],
    payrollData:[],
    Employee: '',
  };

  loadEmployee = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/employees/' + this.props.EmployeeID, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        console.log (response.data[0]);
        this.setState ({Employee: response.data[0]}, () => {
         
        });
      })
      .catch (error => {
        console.log (error);
      });
  };
  loadPositionInfo = () => {
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
  loadDepartmentInfo = () => {
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
  loadPayrollInfo=()=>{
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

  }
  componentWillMount () {
    this.loadPositionInfo ();
    this.loadDepartmentInfo ();
    this.loadPayrollInfo();
    this.loadEmployee ();

  }

  render () {
    return (
      <div className="container">
        <h2 id="role-form-title">Edit Employee Details</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.handleEdit}>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Employee Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Name"
                  required
                  defaultValue={this.state.Employee.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Employee Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Address"
                  required
                  defaultValue={this.state.Employee.address}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Employee Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Employee Email"
                  required
                  defaultValue={this.state.Employee.email}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Phone Number
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  required
                  defaultValue={this.state.Employee.phone}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department" required defaultValue={this.state.Employee.department}>
                  <option value="" disabled>
                    Select your option
                  </option>
                  {this.state.departmentData.map ((data, index) => (
                    <option key={index} value={data['depid']}>
                      {data['depname']}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Position
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="position" required defaultValue={this.state.Employee.position}>
                  <option value="" disabled >
                    Select your option
                  </option>
                  {this.state.positionData.map ((data, index) => (
                    <option key={index} value={data['posid']}>
                      {data['posname']}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Payroll
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department" required defaultValue={this.state.Employee.payroll}>
                  <option value="" disabled >
                    Select your option
                  </option>
                  {this.state.payrollData.map ((data, index) => (
                    <option key={index} value={data['payrollid']}>
                      {data['payrolldescr']}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{span: 6, offset: 0}}>
                <Button type="submit">Submit</Button>
              </Col>
              <Col sm={{span: 4, offset: 2}} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onEditFormClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button" />
          </Form>
        </div>

        {/* </div>
        </div> */}
      </div>
    );
  }
}

export default EmployeeEditForm;
