import React, { Component } from 'react';
import DashBoard from '../components/activities/dashboard/DashBoard';
import NavBar from '../components/nav/navbar/NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <DashBoard />
      </div>
    );
  }
}

export default App;
