import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

class NavBar extends React.Component {
    render() {
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="assets/logo.png" alt="Logo"/>
                        Ha-thor
                    </Menu.Item>
                    <Menu.Item name="Activities"/>
                    <Menu.Item>
                        <Button floated="right" positive inverted content="创建新活动"/>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Button basic inverted content="登陆"/>
                        <Button basic inverted content="注销" style={{marginLeft: '0.5em'}}/>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default NavBar;