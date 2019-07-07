import React from 'react';
import {Grid, Header, Icon, Item, List, Segment} from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailDescription = ({profile, auth}) => {
    console.log("user detail description 1", profile);
    console.log("user detail description 2", auth);
    let createdAt;
    let createdAtForObject;
    let year, month, day, hours, minutes, seconds;

    if (typeof profile.createdAt !== "object"){
        const time = profile.createdAt / 1000;
        createdAt = format(new Date(time), 'D MMM YYYY');
    //    const getDate = newTime.toDate();

    //    console.log("check time", getDate)
    //    createdAt = getDate;
    } else {
        createdAtForObject = profile.createdAt.toDate();
        year = createdAtForObject.getFullYear();
        month = createdAtForObject.getMonth() + 1;
        day = createdAtForObject.getDate();
        // hours = createdAt.getHours();
        // minutes = createdAt.getMinutes();
    }

    return (
        <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='关于我'/>
                                <p>工作: <strong>{profile.occupation}</strong></p>
                                <p>居住地: <strong>{profile.city}</strong></p>
                                <p>注册时间: <strong>{createdAt === "Invalid Date" ||  !createdAt ? `${year} 年 ${month} 月 ${day} 日` : createdAt}</strong></p>
                                <p>简介: {profile.description ? profile.description : profile.about}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='兴趣/爱好'/>
                                {profile.interests ?
                                    <List>
                                        {profile.interests &&
                                            profile.interests.map((interest, index) =>  (
                                                <Item key={index}>
                                                    <Icon name="heart" />
                                                    <Item.Content>{interest}</Item.Content>
                                                </Item>
                                        ))}
                                    </List> : <p>未填写</p>}
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
    );
}

export default UserDetailDescription;