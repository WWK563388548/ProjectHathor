import React from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
// 'withRouter' 基本上就是一个函数，它使一个组件返回到另一个组件
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from './SignOutMenu';
import SignInMenu from './SignInMenu';
import { openModal } from '../../modals/modalActions';
// import { signout } from '../../auth/authActions';
import { withFirebase } from 'react-redux-firebase';

const actions = {
    openModal,
    // signout
};

const mapState = (state) => ({
    auth: state.firebase.auth
})

class NavBar extends React.Component {

    handleSignIn = () => {
        this.props.openModal('LoginModal');
    }

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    }


    handleSignOut = () => {
        this.props.firebase.logout();
        this.props.history.push('/');
    }

    render() {
        const isAuth = this.props.auth;
        console.log("navbar auth: ", isAuth);
        const authenticated = isAuth.isLoaded && !isAuth.isEmpty;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header as={Link} to='/' >
                        <img src="/assets/logo.png" alt="Logo"/>
                        聚乐
                    </Menu.Item>
                    <Menu.Item name="活动列表" as={NavLink} to='/activities' />
                    { authenticated && <Menu.Item name="用户" as={NavLink} to='/people' /> }
                    { authenticated && (
                        <Menu.Item>
                            <Button as={Link} to='/createActivity' floated="right" positive inverted content="创建新活动"/>
                        </Menu.Item>
                    )}
                    {
                        // 若登陆显示<SignInMenu />, 反之则显示<SignOutMenu />
                    }
                    { authenticated ? (
                        <SignInMenu auth={isAuth} signOut={this.handleSignOut} />
                    ) : (
                        <SignOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
                    )}
                </Container>
            </Menu>
        );
    }
}
// 使用'withRouter'
export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));