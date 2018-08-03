import React from 'react';
import { List, Image } from 'semantic-ui-react';

class ActivityListParticipant extends React.Component {
    render() {
        return (
            <List.Item>
                <Image as='a' size='mini' circular src='https://randomuser.me/api/portraits/men/75.jpg' />
            </List.Item>
        );
    }
}

export default ActivityListParticipant;