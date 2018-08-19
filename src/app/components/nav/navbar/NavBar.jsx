import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
// 'withRouter' 基本上就是一个函数，它使一个组件返回到另一个组件
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from './SignOutMenu';
import SignInMenu from './SignInMenu';

class NavBar extends React.Component {

    state = {
        authenticated: false,
    }

    handleSignIn = () => {
        this.setState({
            authenticated: true,
        });
    }

    handleSignOut = () => {
        this.setState({
            authenticated: false,
        });
        this.props.history.push('/');
    }

    render() {
        const isAuth = this.state.authenticated;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header as={Link} to='/' >
                        <img src="assets/logo.png" alt="Logo"/>
                        聚乐
                    </Menu.Item>
                    <Menu.Item name="活动列表" as={NavLink} to='/activities' />
                    { isAuth && <Menu.Item name="用户" as={NavLink} to='/people' /> }
                    {isAuth && (
                        <Menu.Item>
                            <Button as={Link} to='/createActivity' floated="right" positive inverted content="创建新活动"/>
                        </Menu.Item>
                    )}
                    {
                        // 若登陆显示<SignInMenu />, 反之则显示<SignOutMenu />
                    }
                    { isAuth ? (
                        <SignInMenu signOut={this.handleSignOut} />
                    ) : (
                        <SignOutMenu signIn={this.handleSignIn} />
                    )}
                </Container>
            </Menu>
        );
    }
}
// 使用'withRouter'
export default withRouter(NavBar);