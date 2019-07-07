import React from 'react';
import { List, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class ActivityListParticipant extends React.Component {
    
    render() {
        const person = this.props.participant;
        return (
            <List.Item>
                <Image as={Link} to={`/profile/${person.id}`} size='mini' circular src={person.photoURL === "../public/assets/user.png" ? '/assets/user.png' : person.photoURL} />
            </List.Item>
        );
    }
}

export default ActivityListParticipant;