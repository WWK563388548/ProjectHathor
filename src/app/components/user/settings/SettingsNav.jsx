import React from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';

const SettingsNav = () => {
    return (
        <Grid.Column width={4}>
          <Menu vertical>
            <Header icon="user" attached inverted color="grey" content="配置" />
            <Menu.Item>基础</Menu.Item>
            <Menu.Item>关于我</Menu.Item>
            <Menu.Item>我的照片</Menu.Item>
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
            <Menu.Item>我的账户</Menu.Item>
          </Menu>
        </Grid.Column>
    );
}

export default SettingsNav;