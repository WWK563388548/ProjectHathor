import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import SignOutMenu from './SignOutMenu';
import SignInMenu from './SignInMenu';

class NavBar extends React.Component {
    render() {
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header as={Link} to='/' >
                        <img src="assets/logo.png" alt="Logo"/>
                        聚乐
                    </Menu.Item>
                    <Menu.Item name="活动列表" as={NavLink} to='/activities' />
                    <Menu.Item name="用户" as={NavLink} to='/people' />
                    <Menu.Item>
                        <Button as={Link} to='/createActivity' floated="right" positive inverted content="创建新活动"/>
                    </Menu.Item>
                    <SignInMenu />
                    <SignOutMenu />
                </Container>
            </Menu>
        );
    }
}

export default NavBar;