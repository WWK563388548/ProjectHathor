import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const SignOutMenu = (props) => {
    return (
        <Menu.Item position="right">
            <Button onClick={props.signIn} basic inverted content="登陆"/>
            <Button basic inverted content="注册" style={{marginLeft: '0.5em'}}/>
        </Menu.Item>
    );
}

export default SignOutMenu;