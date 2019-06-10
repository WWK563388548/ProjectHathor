import React from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends React.Component {
    render() {
        const activities = this.props.activities;
        return (
            <div>
                {activities && activities.map(item => {
                    return <ActivityListItem key={item.id} activity={item} />;
                })}
            </div>
        );
    }
}

export default ActivityList;