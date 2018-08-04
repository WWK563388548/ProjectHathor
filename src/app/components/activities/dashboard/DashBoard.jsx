import React from 'react';
import ActivityList from '../activitylist/ActivityList';
import ActivityForm from '../activityform/ActivityForm';
import { Grid, Button } from 'semantic-ui-react';

// Fake data
const activitiesData = [
    {
      id: '1',
      title: 'Flutter学习会',
      date: '2018-08-04',
      category: 'knowledge',
      description:
        '学习如何使用Dart与Flutter开发跨平台的移动应用',
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
    },
    {
      id: '2',
      title: '挑战富士山',
      date: '2018-08-15',
      category: 'travel',
      description:
        '找伙伴去爬富士山，下山后也想去富士急',
      city: '富士宫市, 日本',
      location: '日本静冈县河口湖站',
      hostedBy: 'Kejun Chen',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      participants: [
        {
          id: '1',
          name: 'Kejun Chen',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: '2',
          name: 'Weikai Wang',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        }
      ]
    }
  ]

class DashBoard extends React.Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList activities={activitiesData} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content="创建新活动" />
                    <ActivityForm />
                </Grid.Column>
            </Grid>
        );
    }
}

export default DashBoard;