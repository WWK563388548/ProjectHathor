import React from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import LoginForm from '../auth/LoginForm';
import {closeModal} from "./modalActions";

const actions = {closeModal};

class LoginModal extends React.Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    登陆您的聚乐账户
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(LoginModal);