import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import DashBoard from '../components/activities/dashboard/DashBoard';
import NavBar from '../components/nav/navbar/NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className="main">
          <Route path='/activities' component={DashBoard} />
        </Container>
      </div>
    );
  }
}

export default App;
