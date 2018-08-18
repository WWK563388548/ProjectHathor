import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import DashBoard from '../components/activities/dashboard/DashBoard';
import NavBar from '../components/nav/navbar/NavBar';
import ActivityDetailPage from '../components/activities/activitydetail/ActivityDetailPage';
import PeopleDashBoard from '../components/user/peopledashboard/PeopleDashBoard';
import UserDetailPage from '../components/user/userdetail/UserDetailPage';
import SettingsDashBoard from '../components/user/settings/SettingsDashBoard';
import ActivityForm from '../components/activities/activityform/ActivityForm';
import HomePage from '../components/home/HomePage';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className="main">
          {
            // exact：严格匹配路由，使‘／’与‘／xxx’不匹配
          }
          <Route exact path='/' component={HomePage} />
          <Route path='/activities' component={DashBoard} />
          <Route path='/activity/:id' component={ActivityDetailPage} />
          <Route path='/people' component={PeopleDashBoard} />
          <Route path='/profile/:id' component={UserDetailPage} />
          <Route path='/settings' component={SettingsDashBoard} />
          <Route path='/createActivity' component={ActivityForm} />
        </Container>
      </div>
    );
  }
}

export default App;
