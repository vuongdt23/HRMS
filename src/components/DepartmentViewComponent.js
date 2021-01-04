import {Component} from 'react';
import userContext from '../context/usercontext';
import axios from 'axios';
class DepartmentView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      departmentData: [],
    };
  }
  static contextType = userContext;

  LoadDepartmentInfo = () => {
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
  componentDidMount () {
    this.LoadDepartmentInfo ();
  }

  render () {
    return (
      <div>
        <table>
          {this.state.departmentData.map (item => (
            <tr><td key={item.id}>{item.descr}</td></tr>
          ))}
        </table>
        
      <div className="mr-auto">
        AAAAAAAAAAA
      </div >
      </div>

    );
  }
}
export default DepartmentView;
