import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import DashBoard from '../components/activities/dashboard/DashBoard';
import NavBar from '../components/nav/navbar/NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className="main">
          <DashBoard />
        </Container>
      </div>
    );
  }
}

export default App;
