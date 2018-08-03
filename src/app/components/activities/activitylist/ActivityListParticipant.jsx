import React from 'react';
import { List, Image } from 'semantic-ui-react'

class ActivityListParticipant extends React.Component {
    render() {
        return (
            <List.Item>
                <Image src='https://randomuser.me/api/portraits/men/11.jpg' as='a' size='mini' circular />
            </List.Item>
        );
    }
}

export default ActivityListParticipant;