import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Apply from './ApplyComponent';
import Schedule from './ScheduleComponent';
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
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/Apply" component={ApplyPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
