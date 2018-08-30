import React from 'react';
import { Grid } from 'semantic-ui-react';
import DetailHeader from './ActivityDetailHeader';
import DetailInfo from './ActivityDetailInfo';
import DetailChat from './ActivityDetailChat';
import DetailSideBar from './ActivityDetailSideBar';

const activity = {
    
    id: '1',
    title: 'Flutter学习会',
    date: '2018-08-04',
    category: 'knowledge',
    description:'学习如何使用Dart与Flutter开发跨平台的移动应用',
    city: '东京, 日本',
    location: "东京都中央区银座1-43-2歌舞伎座塔",
    hostedBy: 'Weikai Wang',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    participants: [
        {
          id: '1',
          name: 'Weikai Wang',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: '2',
          name: 'Kejun Chen',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
    ]
};

// This is stateless functional component
const ActivityDetailPage = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <DetailHeader activity={activity}/>
                <DetailInfo activity={activity}/>
                <DetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <DetailSideBar participants={activity.participants}/>
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDetailPage;