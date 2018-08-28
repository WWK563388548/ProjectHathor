import React from 'react';
import { Grid } from 'semantic-ui-react';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';

// This is stateless functional component
const ActivityDetailPage = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <DetailHeader />
                <DetailInfo />
                <DetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <DetailSideBar />
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDetailPage;