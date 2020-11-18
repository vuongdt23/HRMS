import {Component} from 'react';
import DEPARTMENTS from '../shared/Departments';

class DepartmentView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      departments: DEPARTMENTS,
    };
  }
}
export default DepartmentView;
