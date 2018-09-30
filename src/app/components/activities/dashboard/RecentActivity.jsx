import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const RecentActivity = () => {
    return (
        <div>
            <Header attached="top" content="最新的活动" />
            <Segment attached>
                <p>最新的活动</p>
            </Segment>
        </div>
    );
};

export default RecentActivity;