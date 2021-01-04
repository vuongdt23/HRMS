import React, {useContext, useState, Component} from 'react';
import userContext from '../context/usercontext';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';
import {
  Table,
  tr,
  td,
  Button,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from 'reactstrap';

function handleEditButtonClick (event) {
  console.log (event.target.id);
}
function renderPerson (employee, index) {
  return (
    <tr key={index}>
      <td>{employee.name}</td>
      <td>{employee.address}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
      <Button id={index} onClick={e => handleEditButtonClick (e)}>
        {' '}Edit{' '}
      </Button>
      <Button> Delete </Button>
    </tr>
  );
}
function EmployeesView (props) {
  const user = useContext (userContext);
  const [employees, setEmployees] = useState (Array);
  const [isLoaded, setIsLoaded] = useState (false);
  const [isEditModalOpen, setisEditModalOpen] = useState (true);
  const [isAddModalOpen, setisAddModalOpen] = useState (true);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState (0);
  const [newEmployee, setnewEmployee] = useState ({
    name: '',
    email: '',
    address: '',
    phone: '',
    descr: '',
  });
  console.log ('user', user.user);
  const toggleEditModal = () => {
    setisEditModalOpen (!isEditModalOpen);
  };
  const toggleAddModal = () => {
    setisAddModalOpen (!isAddModalOpen);
  };
  const handleAddEmployee = () => {
    axios.post ('http://localhost:3000/employees/', {
      headers: {
        Authorization: `bearer ${user.user.token}`,
      },
    });
    setIsLoaded (false);
    console.log (newEmployee.email);
  };

  if (!user.user.isLoggedin) {
    return (
      <div>
        Please login to access this function.
      </div>
    );
  } else {
    if (!isLoaded) {
      axios
        .get ('http://localhost:3000/employees/', {
          headers: {
            Authorization: `bearer ${user.user.token}`,
          },
        })
        .then (res => {
          setEmployees (res.data);
          setIsLoaded (true);
          console.log (employees);
        })
        .catch (err => {
          console.log (err);
        });
      return <div> Is Loading</div>;
    }
    return (
      <div>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Name</th>

              <th>Address</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map (renderPerson)}
          </tbody>
          <div />
        </Table>

        <Modal id="addmodal" isOpen={isAddModalOpen}>
          <EmployeeForm/>
        </Modal>

      </div>
    );
  }
}
// todo: make this one a class component
export default EmployeesView;
