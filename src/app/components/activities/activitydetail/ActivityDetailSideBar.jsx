import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ActiivityDetailSideBar extends React.Component {
    render() {
        const { isHost, participants } = this.props;
        console.log("What is member in sidebar", participants);
        return (
            <div>
                <Segment
                    textAlign="center"
                    style={{ border: 'none' }}
                    attached="top"
                    secondary
                    inverted
                    color="teal"
                >
                    {participants && participants.length} 名参加者
                </Segment>
                <Segment attached>
                    <List relaxed divided>
                    {
                        participants && participants.map(member => (
                            <Item key={member.id} style={{ position: 'relative' }}>
                                {isHost && (
                                    <Label
                                        style={{ position: 'absolute' }}
                                        color="orange"
                                        ribbon="right"
                                    >   
                                        创办者
                                    </Label>
                                )}
                                <Item.Image size="tiny" src={member.photoURL} />
                                <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        <Link to={`/profile/${member.id}`}>{member.name || member.displayName}</Link>
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        ))
                    }
                    </List>
                </Segment>
            </div>
        );
    }
}

export default ActiivityDetailSideBar;