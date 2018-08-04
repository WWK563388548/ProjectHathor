import React from 'react';
import ActivityListParticipant from './ActivityListParticipant';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';

class ActivityListItem extends React.Component {
    render() {
        const activityItemData = this.props.activity;
        return (
            <Segment.Group>

                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={activityItemData.hostPhotoURL} />
                            <Item.Content>
                                <Item.Header as="a">{activityItemData.title}</Item.Header>
                                <Item.Description>
                                    组织者: <a>{activityItemData.hostedBy}</a>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>

                <Segment>   
                    <span>
                        <Icon name="clock" /> {activityItemData.date} |
                        <Icon name="marker" /> {activityItemData.location}
                    </span>
                </Segment>

                <Segment secondary>
                    <List horizontal>
                        {activityItemData.participants.map( item => {
                            return <ActivityListParticipant key={item.id} participant={item} />;
                        })}
                    </List>
                </Segment>

                <Segment clearing>
                    <span>{activityItemData.description}</span>
                    <Button as="a" color="teal" floated="right" content="详细" />
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActivityListItem;