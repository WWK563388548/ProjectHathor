const sampleData = {
    activities: [
        {
          id: '1',
          title: 'Flutter学习会',
          date: '2018-08-04T18:00:00',
          category: 'culture',
          description:
            '学习如何使用Dart与Flutter开发跨平台的移动应用',
          city: '东京, 日本',
          location: "东京都中央区银座1-43-2歌舞伎座塔",
          locationLatLng: {
            lat: 35.6697588,
            lng: 139.76796439999998,
          },
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
          date: '2018-08-15T18:00:00',
          category: 'travel',
          description:
            '找伙伴去爬富士山，下山后也想去富士急',
          city: '山梨县, 日本',
          location: '日本山梨县河口湖站',
          locationLatLng: {
            lat: 35.498831,
            lng: 138.76939400000003,
          },
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
    ],
}

export default sampleData;