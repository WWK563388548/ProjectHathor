import React from 'react';
import { Card, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';

const UserDetailActivities = () => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="calendar" content="活动一览" />
        <Menu secondary pointing>
          <Menu.Item name="所有活动" active />
          <Menu.Item name="过去的活动" />
          <Menu.Item name="未来的活动" />
          <Menu.Item name="我的活动" />
        </Menu>

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={'/assets/categoryImages/party.jpg'} />
            <Card.Content>
              <Card.Header textAlign="center">活动1</Card.Header>
              <Card.Meta textAlign="center">
                2019 年 8月 19日 - 21时 30分
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card>
            <Image src={'/assets/categoryImages/party.jpg'} />
            <Card.Content>
              <Card.Header textAlign="center">活动2</Card.Header>
              <Card.Meta textAlign="center">
                2019 年 8月 19日 - 21时 31分
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailActivities;