import React, {Component} from 'react';
// import { Form,Button } from "react-bootstrap";
import {Form, Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';

class DepartmentForm extends Component {
  state = {};
  render () {
    return (
      <div>
        <h2 id="role-form-title">Add Department Details</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.onDepartmentSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Department"
                  name="Department"
                 // onChange={e => {
                //    this.props.HandleDepartmentNameChange (e.target.value);
                 // }}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Department Description"
                  name="Department Description"
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
                <Button type="reset" onClick={this.props.onFormClose}>
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

export default DepartmentForm;
