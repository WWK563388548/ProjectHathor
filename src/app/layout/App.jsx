import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '../components/activities/dashboard/DashBoard';
import NavBar from '../components/nav/navbar/NavBar';
import ActivityDetailPage from '../components/activities/activitydetail/ActivityDetailPage';
import PeopleDashBoard from '../components/user/peopledashboard/PeopleDashBoard';
import UserDetailPage from '../components/user/userdetail/UserDetailPage';
import SettingsDashBoard from '../components/user/settings/SettingsDashBoard';
import ActivityForm from '../components/activities/activityform/ActivityForm';
import HomePage from '../components/home/HomePage';
import ReduxTestComponent from '../components/testarea/ReduxTestComponet';

/**
*  <Switch>是唯一的因为它仅仅只会渲染一个(相匹配的)路径。
* 相比之下（不使用<Switch>包裹的情况下），
* 每一个被location匹配到的<Route>将都会被渲染。
*/

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {
            // exact：严格匹配路由，使‘／’与‘／xxx’不匹配
          }
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route 
          path='/(.+)'
          render={() => {
            return (
              <div>
                <NavBar/>
                <Container className="main">
                  <Switch>
                    <Route path='/activities' component={DashBoard} />
                    <Route path='/reduxtest' component={ReduxTestComponent} />
                    <Route path='/activity/:id' component={ActivityDetailPage} />
                    <Route path='/people' component={PeopleDashBoard} />
                    <Route path='/profile/:id' component={UserDetailPage} />
                    <Route path='/settings' component={SettingsDashBoard} />
                    <Route path='/createActivity' component={ActivityForm} />
                  </Switch>
                </Container>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
