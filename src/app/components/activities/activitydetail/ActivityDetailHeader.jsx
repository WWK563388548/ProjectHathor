import React, {Fragment} from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import chineseLocale from 'date-fns/locale/zh_cn';

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

        const {activity, isHost, isGoing} = this.props;
        console.log(activity);
        console.log(this.props);
        let activityDate;
        let year, month, day, hours, minutes, seconds;
        if(activity.date){
            activityDate = activity.date.toDate();
            year = activityDate.getFullYear();
            month = activityDate.getMonth() + 1;
            day = activityDate.getDate();
            hours = activityDate.getHours();
            minutes = activityDate.getMinutes();
        }
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
                                    <p>{`${year} 年 ${month} 月 ${day} 日`}</p>
                                    <p>
                                        举办者: <strong>{activity.hostedBy}</strong>
                                    </p>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Segment>
    
                <Segment attached="bottom" clearing>

                    {!isHost && 
                        <Fragment>
                            {isGoing ? (
                                <Button>取消参加</Button>
                                ) : (
                                <Button color="teal">参加活动</Button>
                                )
                            }
                        </Fragment>
                    }
    
                    {isHost && 
                        <Button as={Link} to={`/manage/${activity.id}`} color="orange" floated="right">
                            管理活动
                        </Button>
                    }
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActiivityDetailHeader;