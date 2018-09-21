import React from 'react';
import { connect } from 'react-redux';
import testModal from './testModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
    testModal,
    LoginModal,
    RegisterModal
}

const mapState = (state) => ({
    currentModal: state.modals
});

const ModalManager = ({currentModal}) => {
    let renderedModal;
    if(currentModal) {
        const {modalType, modalProps} = currentModal;
        const ModalComponent = modalLookup[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }

    return <span>{renderedModal}</span>;
}

export default connect(mapState)(ModalManager);