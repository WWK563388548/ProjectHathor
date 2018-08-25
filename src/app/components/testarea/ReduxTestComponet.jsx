import React from 'react';
import { connect } from 'react-redux';

const mapState = (state) => ({
    data: state.test.data,
})

class ReduxTestComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Test Area</h1>
                <h2>The answer is: {this.props.data}</h2>
            </div>
        );
    }
}

export default connect(mapState)(ReduxTestComponent);