import React from 'react';
import { List, Image } from 'semantic-ui-react';

class ActivityListParticipant extends React.Component {
    
    render() {
        const person = this.props.participant;
        return (
            <List.Item>
                <Image as='a' size='mini' circular src={person.photoURL} />
            </List.Item>
        );
    }
}

export default ActivityListParticipant;