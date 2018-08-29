import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';

class ActiivityDetailSideBar extends React.Component {
    render() {
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
                    2人参加
                </Segment>
                <Segment attached>
                    <List relaxed divided>
                        <Item style={{ position: 'relative' }}>
                            <Label
                                style={{ position: 'absolute' }}
                                color="orange"
                                ribbon="right"
                            >
                                创办者
                            </Label>
                            <Item.Image size="tiny" src="/assets/user.png" />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <a>Weikai Wang</a>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    </List>
                </Segment>
            </div>
        );
    }
}

export default ActiivityDetailSideBar;