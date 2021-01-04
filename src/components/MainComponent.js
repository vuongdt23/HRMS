import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Apply from './ApplyComponent';
import Schedule from './ScheduleComponent';
import Sidebar from './SidebarComponent';
import EmployeesView from './EmployeesViewComponent';
import EmployeeList from './EmployeeListComponent';
import DepartmentView from './DepartmentViewComponent';

import '../App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import userContext from '../context/usercontext';
import EmployeeForm from './EmployeeForm';
class Main extends Component {
  constructor (props) {
    super (props);
    this.state = {
      user: {
        isLoggedin: false,
      },
    };
  }

  setUser = user => {
    this.setState (prevState => ({user}));
  };
  render () {
    const {user} = this.state;
    const {setUser} = this;
    const HomePage = () => {
      return <Home />;
    };
    const ApplyPage = () => {
      return <Apply />;
    };
    const SchedulePage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <Schedule />;
        </userContext.Provider>
      );
    };
    const DepartmentPage =() =>{
      return (
        <userContext.Provider value={{user, setUser}}>
        <DepartmentView/>
        </userContext.Provider>
      );
    }
    const EmployeesViewPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <EmployeeList />
        </userContext.Provider>
      );
    };
    const EmployeesAddPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <EmployeeForm />
        </userContext.Provider>
      );
    };
    return (
      <div>
        <userContext.Provider value={{user, setUser}}>
          <Header />
        </userContext.Provider>
        <div className="row">
          <div className="col-2">

            <Sidebar />
          </div>
          <div className="col-10">
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/Apply" component={ApplyPage} />
              <Route path="/Schedule" component={SchedulePage} />
              <Route path="/Employees" component={EmployeesViewPage}/>
              <Route path="/AddEmployee" component={EmployeesAddPage}/>
              <Redirect to="/home" />
            </Switch>

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
