import React from 'react';
import { Card, Grid, Header, Image, Menu, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const panes = [
  {menuItem: '所有活动', pane: {key: 'allActivities'}},
  {menuItem: '过去的活动', pane: {key: 'pastActivities'}},
  {menuItem: '未来的活动', pane: {key: 'futureActivities'}},
  {menuItem: '我的活动', pane: {key: 'myActivities'}},
];

const UserDetailActivities = (props) => {

  const { activities, activitiesLoading, changeTab } = props;
  return (
    <Grid.Column width={12}>
      <Segment attached loading={activitiesLoading} >
        <Header icon="calendar" content="活动一览" />
        <Tab 
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes} 
          menu={{secondary: true, pointing: true}} 
        />
        <br />

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