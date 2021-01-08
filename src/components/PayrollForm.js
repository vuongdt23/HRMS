import React, {Component} from 'react';
// import { Form,Button } from "react-bootstrap";
import {Form, Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';

class PayrollForm extends Component {
  
  render () {
    return (
      <div className="container">
        <h2 id="role-form-title">Add Payroll Details</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onPayrollSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Salary Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Salary Description"
                  name="Salary Description"
                 // onChange={e => {
                //    this.props.HandleDepartmentNameChange (e.target.value);
                 // }}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Salary Amount
              </Form.Label>

              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Salary Amount"
                  name="Salary Amount"
                  required
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
                <Button type="reset" onClick={this.props.onCancel}>
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

export default PayrollForm;
