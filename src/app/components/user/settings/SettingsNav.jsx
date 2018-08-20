import React from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
    return (
        <Grid.Column width={4}>
          <Menu vertical>
            <Header icon="user" attached inverted color="grey" content="配置" />
            <Menu.Item as={NavLink} to='/settings/basic'>基础设置</Menu.Item>
            <Menu.Item as={NavLink} to='/settings/about'>关于我</Menu.Item>
            <Menu.Item as={NavLink} to='/settings/photos'>我的照片</Menu.Item>
          </Menu>
          <Grid.Row />
          <Menu vertical>
            <Header
              icon="settings"
              attached
              inverted
              color="grey"
              content="账户"
            />
            <Menu.Item as={NavLink} to='/settings/account'>我的账户</Menu.Item>
          </Menu>
        </Grid.Column>
    );
}

export default SettingsNav;