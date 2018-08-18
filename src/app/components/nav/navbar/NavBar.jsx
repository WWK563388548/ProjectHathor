import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header as={Link} to='/' >
                        <img src="assets/logo.png" alt="Logo"/>
                        Ha-thor
                    </Menu.Item>
                    <Menu.Item name="活动列表" as={NavLink} to='/activities' />
                    <Menu.Item name="用户" as={NavLink} to='/people' />
                    <Menu.Item>
                        <Button as={Link} to='/createActivity' floated="right" positive inverted content="创建新活动"/>
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