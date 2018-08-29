import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';

class ActiivityDetailHeader extends React.Component {

    render() {
        const activityImageStyle = {
            filter: 'brightness(30%)'
        };

        const activityImageTextStyle = {
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            width: '100%',
            height: 'auto',
            color: 'white'
        };

        return (
            <Segment.Group>
                <Segment basic attached="top" style={{ padding: '0' }} >
                    <Image style={activityImageStyle} src="/assets/categoryImages/party.jpg" fluid />
    
                    <Segment basic style={activityImageTextStyle} >
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size="huge"
                                        content="活动标题"
                                        style={{ color: 'white' }}
                                    />
                                    <p>活动时间</p>
                                    <p>
                                        举办者: <strong>Weikai Wang</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>
    
                <Segment attached="bottom">
                    <Button>取消</Button>
                    <Button color="teal">参加活动</Button>
    
                    <Button color="orange" floated="right">
                        管理活动
                    </Button>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActiivityDetailHeader;