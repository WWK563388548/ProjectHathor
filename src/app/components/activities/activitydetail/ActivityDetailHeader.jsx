import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

        const activity = this.props.activity;
        console.log(activity);
        return (
            <Segment.Group>
                <Segment basic attached="top" style={{ padding: '0' }} >
                    <Image style={activityImageStyle} src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
    
                    <Segment basic style={activityImageTextStyle} >
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Header
                                        size="huge"
                                        content={activity.title}
                                        style={{ color: 'white' }}
                                    />
                                    <p>{activity.date}</p>
                                    <p>
                                        举办者: <strong>{activity.hostedBy}</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>
    
                <Segment attached="bottom">
                    <Button>取消</Button>
                    <Button color="teal">参加活动</Button>
    
                    <Button as={Link} to={`/manage/${activity.id}`} color="orange" floated="right">
                        管理活动
                    </Button>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActiivityDetailHeader;