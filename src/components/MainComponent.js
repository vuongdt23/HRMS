import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Apply from './ApplyComponent';
import Schedule from './ScheduleComponent';
import Sidebar from './SidebarComponent';
import '../App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
 

class Main extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    const HomePage = () => {
      return <Home />;
    };
    const ApplyPage = () => {
      return <Apply />;
    };
    const SchedulePage =() =>{
      return <Schedule/>
    }
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/Apply" component={ApplyPage} />
              <Route path="/Schedule" component={SchedulePage}/>
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
