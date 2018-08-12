import React from 'react';
import ActivityListItem from './ActivityListItem';

class ActivityList extends React.Component {
    render() {
        const activities = this.props.activities;
        const onActivityEdit = this.props.onActivityEdit;
        return (
            <div>
                <h1>活动列表</h1>
                {activities.map(item => {
                    return <ActivityListItem 
                            key={item.id} 
                            activity={item} 
                            onActivityEdit={onActivityEdit} />;
                })}
            </div>
        );
    }
}

export default ActivityList;