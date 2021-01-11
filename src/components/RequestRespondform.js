import React, {Component} from 'react';
// import { Form,Button } from "react-bootstrap";
import {Form, Button, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import userContext from '../context/usercontext';

class RequestRespondForm extends Component {
  state = {
    Request: '',
  };
  static contextType = userContext;

  loadRequest = () => {
    const {user, setUser} = this.context;
    axios
      .get ('http://localhost:3000/request/' + this.props.reqid, {
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      })
      .then (response => {
        console.log (response.data[0]);
        this.setState ({Request: response.data[0]}, () => {
          console.log (this.state.Request);
        });
      })
      .catch (error => {
        console.log (error);
      });
  };
  componentWillMount () {
    this.loadRequest ();
  }
  render () {
    return (
      <div className="container">
        <h2 id="role-form-title">Edit Position Details</h2>

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={this.props.handleRespond}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Title"
                  name="Title"
                  defaultValue={this.state.Request.restitle}
                  // onChange={e => {
                  //    this.props.HandleDepartmentNameChange (e.target.value);
                  // }}
                  readOnly
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Request Message
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Request Message"
                  name="Request Message"
                  readOnly
                  defaultValue={this.state.Request.resdescr}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Respond Message
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Respond Message"
                  name="Respond Message"
                  required
                  defaultValue={this.state.Request.resespond}
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

export default RequestRespondForm;
