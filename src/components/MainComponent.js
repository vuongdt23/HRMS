import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import PayrollList from './PayrollListComponent';
import Sidebar from './SidebarComponent';
import EmployeeList from './EmployeeListComponent';
import DepartmentView from './DepartmentViewComponent';
import PositionList from './PositionListViewComponent';
import '../App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import userContext from '../context/usercontext';
import UserProfile from './MyProfileComponent';
class Main extends Component {
  constructor (props) {
    super (props);
    this.state = {
      user: {
        isLoggedin: false,
        permisson: '',
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

    const DepartmentPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <DepartmentView />
        </userContext.Provider>
      );
    };
    const PayrollPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <PayrollList />
        </userContext.Provider>
      );
    };
    const EmployeesViewPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <EmployeeList />
        </userContext.Provider>
      );
    };
    const DepartmentsPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <DepartmentView />
        </userContext.Provider>
      );
    };
    const PositionsPage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <PositionList />
        </userContext.Provider>
      );
    };
    const ProfilePage = () => {
      return (
        <userContext.Provider value={{user, setUser}}>
          <UserProfile />
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

              <Route path="/Employees" component={EmployeesViewPage} />
              <Route path="/Departments" component={DepartmentsPage} />
              <Route path="/Positions" component={PositionsPage} />
              <Route path="/Payroll" component={PayrollPage} />
              <Route path="/Myprofile" component={ProfilePage} />
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
