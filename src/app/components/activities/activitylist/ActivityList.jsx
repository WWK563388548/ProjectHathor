import React from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends React.Component {
    render() {
        return (
            <div>
                <h1>活动列表</h1>
                <ActivityListItem />
                <ActivityListItem />
                <ActivityListItem />
                <ActivityListItem />
            </div>
        );
    }
}

export default ActivityList;