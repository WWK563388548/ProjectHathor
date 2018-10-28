import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import { connect } from 'react-redux';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { updatePassword } from '../../auth/authActions';

const actions = {
    updatePassword
};

const mapState = (state) => ({
    providerId: state.firebase.auth.providerData[0].providerId,
});

// This is stateless functional component
const SettingsDashBoard = (props) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    {
                        // 如果是'/settings'的情况下，总是重定向到'/settings/basic'页面
                    }
                    <Redirect exact from='/settings' to='/settings/basic'/>
                    <Route path='/settings/basic' component={BasicPage} />
                    <Route path='/settings/about' component={AboutPage} />
                    <Route path='/settings/photos' component={PhotosPage} />
                    {
                        // 通过<Route>来传递props
                    }
                    <Route 
                        path='/settings/account' 
                        render={() => <AccountPage updatePassword={props.updatePassword} providerId={props.providerId} />} />
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    );
}

export default connect(mapState, actions)(SettingsDashBoard);