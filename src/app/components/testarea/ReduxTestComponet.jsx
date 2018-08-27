import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';

const mapState = (state) => ({
    data: state.test.data,
});

const actions = {
    incrementCounter,
    decrementCounter
}

class ReduxTestComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Test Area</h1>
                <h2>The answer is: {this.props.data}</h2>
                <Button onClick={this.props.incrementCounter} color='green' content='increment' />
                <Button onClick={this.props.decrementCounter} color='red' content='decrement' />
            </div>
        );
    }
}

export default connect(mapState, actions)(ReduxTestComponent);