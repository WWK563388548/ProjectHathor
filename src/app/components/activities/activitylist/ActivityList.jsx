import React from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends React.Component {
    render() {
        const activities = this.props.activities;
        const onActivityEdit = this.props.onActivityEdit;
        const deleteActivity = this.props.deleteActivity;
        return (
            <div>
                <h1>活动列表</h1>
                {activities.map(item => {
                    return <ActivityListItem 
                            key={item.id} 
                            activity={item} 
                            onActivityEdit={onActivityEdit}
                            deleteActivity={deleteActivity} />;
                })}
            </div>
        );
    }
}

export default ActivityList;