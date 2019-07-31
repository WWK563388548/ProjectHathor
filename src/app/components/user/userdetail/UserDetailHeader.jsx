import React from 'react';
import {Grid, Header, Item, Segment} from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailHeader = ({profile}) => {
    console.log("user detail header", profile);
    return (
         <Grid.Column width={16}>
            <Segment>
                <Item.Group>
                    <Item>
                        <LazyLoad
                            height={150}
                            placeholder={
                                <Item.Image 
                                    avatar 
                                    size='small' 
                                    src='/assets/user.png'
                                />
                            }
                        >
                            <Item.Image 
                                avatar 
                                size='small' 
                                src={profile.photoURL || '/assets/user.png'} 
                            />
                        </LazyLoad>
                        <Item.Content verticalAlign='bottom'>
                            <Header as='h1'>{profile.displayName}</Header>
                            <br/>
                            <Header as='h3'>{profile.occupation}</Header>
                            <br/>
                            <Header as='h3'>居住在 {profile.city || ''}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    );
}

export default UserDetailHeader;