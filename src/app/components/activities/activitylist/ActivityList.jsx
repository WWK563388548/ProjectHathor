import React from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends React.Component {
    render() {
        const activities = this.props.activities;
        const deleteActivity = this.props.deleteActivity;
        return (
            <div>
                {activities.map(item => {
                    return <ActivityListItem 
                            key={item.id} 
                            activity={item} 
                            deleteActivity={deleteActivity} />;
                })}
            </div>
        );
    }
}

export default ActivityList;