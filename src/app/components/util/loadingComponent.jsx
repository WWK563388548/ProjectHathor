import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const loadingComponent = (props) => {
    const inverted = props.inverted;
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content="加载中..." />
        </Dimmer>
    );
}

export default loadingComponent;