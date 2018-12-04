import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";


class UserDetailedPageStatic extends Component {

    render() {

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src='https://randomuser.me/api/portraits/men/20.jpg'/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>姓名</Header>
                                    <br/>
                                    <Header as='h3'>职位</Header>
                                    <br/>
                                    <Header as='h3'>地址</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='关于我'/>
                                <p>工作: <strong>软件工程师</strong></p>
                                <p>国籍: <strong>中国</strong></p>
                                <p>注册时间: <strong>2018/12/03</strong></p>
                                <p>个人描述</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='兴趣/爱好'/>
                                <List>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>兴趣 1</Item.Content>
                                    </Item>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>兴趣 2</Item.Content>
                                    </Item>
                                    <Item>
                                        <Icon name='heart'/>
                                        <Item.Content>兴趣 3</Item.Content>
                                    </Item>
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button color='teal' fluid basic content='编辑个人档案'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='我的图片'/>
                        
                        <Image.Group size='small'>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='我的活动'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'./public/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        活动主题 1
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        2018/12/01 10:00 AM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        活动主题 2
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        2018/12/02 17:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default UserDetailedPageStatic;