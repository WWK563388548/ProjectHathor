import React from 'react';
import {Grid, Button, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailSidebar = ({isCurrentUser}) => {
    return (
        <Grid.Column width={4}>
            <Segment>
                {isCurrentUser 
                    ? 
                    (
                        <Button 
                            as={Link} 
                            to='/settings' 
                            color='teal' 
                            fluid 
                            basic 
                            content='编辑个人档案'
                        />
                    ) 
                    : 
                    (
                        <Button 
                            color='teal' 
                            fluid 
                            basic 
                            content='关注他'
                        />
                    )
                }
            </Segment>
        </Grid.Column>
    );
}

export default UserDetailSidebar;