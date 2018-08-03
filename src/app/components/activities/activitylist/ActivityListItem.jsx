import React from 'react';
import ActivityListParticipant from './ActivityListParticipant';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';

class ActivityListItem extends React.Component {
    render() {
        return (
            <Segment.Group>

                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src="https://randomuser.me/api/portraits/men/11.jpg" />
                            <Item.Content>
                                <Item.Header as="a">Flutter开发跨平台App学习会</Item.Header>
                                <Item.Description>
                                    主办人 <a>Weikai Wang</a>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>

                <Segment>   
                    <span>
                        <Icon name="clock" /> 日期 |
                        <Icon name="marker" /> 地点
                    </span>
                </Segment>

                <Segment secondary>
                    <List horizontal>
                        {/* Participants in here */}
                        <List horizontal>
                            <ActivityListParticipant />
                        </List>
                    </List>
                </Segment>

                <Segment clearing>
                    <span>这里是简介</span>
                    <Button as="a" color="teal" floated="right" content="View" />
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActivityListItem;