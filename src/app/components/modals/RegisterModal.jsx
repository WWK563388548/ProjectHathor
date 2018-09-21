import React from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {closeModal} from "./modalActions";
import RegisterForm from "../auth/RegisterForm";

const actions = {closeModal};

class RegisterModal extends React.Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    注册您的聚乐账户
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(RegisterModal);