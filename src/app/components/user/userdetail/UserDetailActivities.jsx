import React from 'react';
import { Card, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const UserDetailActivities = (props) => {

  const { activities, activitiesLoading } = props;

  return (
    <Grid.Column width={12}>
      <Segment attached loading={activitiesLoading} >
        <Header icon="calendar" content="活动一览" />
        <Menu secondary pointing>
          <Menu.Item name="所有活动" active />
          <Menu.Item name="过去的活动" />
          <Menu.Item name="未来的活动" />
          <Menu.Item name="我的活动" />
        </Menu>

        <Card.Group itemsPerRow={5}>
          {activities && activities.map(activity => {
            let activityDate;
            let year, month, day, hours, minutes;
            if(activity.date){
              activityDate = activity.date.toDate();
              // date.getFullYear()
              year = activityDate.getFullYear();
              month = activityDate.getMonth() + 1;
              day = activityDate.getDate();
              hours = activityDate.getHours();
              minutes = activityDate.getMinutes();
            }
            return (
              <Card as={Link} to={`/activity/${activity.id}`} key={activity.id}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                <Card.Content>
                  <Card.Header 
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }} 
                    textAlign="center"
                  >
                    {activity.title}
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{`${year}年 ${month}月 ${day}日`}</div>
                    <div>{`${hours}时 ${minutes}分`}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })}

        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailActivities;