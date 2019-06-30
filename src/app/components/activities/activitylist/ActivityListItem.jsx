import React from 'react';
import ActivityListParticipant from './ActivityListParticipant';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import chineseLocale from 'date-fns/locale/zh_cn';
import { objectToArray } from '../activityActions';

class ActivityListItem extends React.Component {
    render() {
        const activityItemData = this.props.activity;
        // const onActivityEdit = this.props.onActivityEdit;
        let date;
        let year, month, day, hours, minutes, seconds;
        if(activityItemData.date){
            date = activityItemData.date.toDate();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
        }
        
        return (
            <Segment.Group>

                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={activityItemData.hostPhotoURL} />
                            <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activityItemData.id}`}>{activityItemData.title}</Item.Header>
                                <Item.Description>
                                    组织者: <Link to={`/profile/${activityItemData.hostUid}`}>{activityItemData.hostedBy}</Link>
                                </Item.Description>
                                {activityItemData.cancelled &&
                                    <Label 
                                        style={{top: '-40px'}} 
                                        ribbon='right' 
                                        color="red" 
                                        content="此活动已经被取消" />
                                }
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>

                <Segment>   
                    <span>
                        <Icon name="clock" /> {`${year} 年 ${month} 月 ${day} 日 - ${hours} 时 ${minutes} 分`} |
                        <Icon name="marker" /> {activityItemData.location}
                    </span>
                </Segment>

                <Segment secondary>
                    <List horizontal>
                        {
                            /* 判断参与者数组是否为空 */
                        }
                        {activityItemData.participants && 
                            objectToArray(activityItemData.participants).map( (item) => {
                            return <ActivityListParticipant key={item.id} participant={item} />;
                        })}
                    </List>
                </Segment>

                <Segment clearing>
                    <span>{activityItemData.description}</span>
                    {console.log(activityItemData)}
                    {console.log(activityItemData.id)}
                    <Button
                    as={Link}
                    to={`/activity/${activityItemData.id}`}
                    color="teal" 
                    floated="right" 
                    content="详细" />
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActivityListItem;