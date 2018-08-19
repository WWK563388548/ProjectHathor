import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

const SignInMenu = (props) => {
    return (
        <Menu.Item position="right">
          <Image avatar spaced="right" src='/assets/user.png' />
          <Dropdown pointing="top left" text="Username">
            <Dropdown.Menu>
              <Dropdown.Item text="创建新活动" icon="plus" />
              <Dropdown.Item text="我的活动" icon="calendar" />
              <Dropdown.Item text="我的好友" icon="users" />
              <Dropdown.Item text="我的资料" icon="user" />
              <Dropdown.Item text="设置" icon="settings" />
              <Dropdown.Item onClick={props.signOut} text="退出登录" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
    );
}

export default SignInMenu;