import React, {Component} from 'react';
// import { Form,Button } from "react-bootstrap";
import {Form, Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import userContext from '../context/usercontext';

class PositionEditForm extends Component {
  state = {
    Payroll: '',
    
    
  };
  static contextType = userContext;

  loadPayroll = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/payroll/' + this.props.payrollID, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        console.log (response.data[0]);
        this.setState ({Payroll: response.data[0]}, () => {});
      })
      .catch (error => {
        console.log (error);
      });
  };
  componentWillMount () {
    this.loadPayroll ();
  }
  render () {
    return (
      <div className="container">
        <h2 id="role-form-title">Edit Salary Details</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.HandleEdit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Salary Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Position"
                  name="Position"
                  defaultValue={this.state.Payroll.payrolldescr}
                  // onChange={e => {
                  //    this.props.HandleDepartmentNameChange (e.target.value);
                  // }}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Amount
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Number"
                  placeholder="Position Description"
                  name="Position Description"
                  required
                  defaultValue={this.state.Payroll.amount}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{span: 10, offset: 2}}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{span: 10, offset: 2}} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onEditFormClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default PositionEditForm;
