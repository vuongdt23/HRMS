import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Apply from './ApplyComponent';
import Schedule from './ScheduleComponent';
import Sidebar from './SidebarComponent';
import '../App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import userContext from '../context/usercontext';
class Main extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }
  state = {
    user: {},
  };

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
      return <Schedule />;
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
