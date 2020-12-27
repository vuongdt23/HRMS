import {Button, Card, CardBody, CardImg} from 'reactstrap';
import Axios from 'axios';

function RenderEmployeeCard (Employee, Onlick) {
  return (
    <div>
      <Card>
        <CardImg src={Employee.image} alt="EmployeeImage" />
        <CardBody>
          <p className="text-secondary"> Guy </p>
        </CardBody>
      </Card>
    </div>
  );
}
function EmployeesView (props) {
  return (
    <div className="container">
     
    </div>
  );
}

export default EmployeesView;
