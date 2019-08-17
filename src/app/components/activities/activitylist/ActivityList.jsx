import React from 'react';
import ActivityListItem from './ActivityListItem';
import InfiniteScroller from 'react-infinite-scroller';

class ActivityList extends React.Component {
    render() {
        console.log("ActivityList", activities);
        const {activities, getNextActivities, loading, moreActivity} = this.props;
        return (
            <div>
                {activities && activities.length !== 0 && 
                    <InfiniteScroller
                        pageStart={0}
                        loadMore={getNextActivities}
                        hasMore={!loading && moreActivity}
                        initialLoad={false}
                    >
                        {activities && activities.map(item => {
                            return <ActivityListItem key={item.id} activity={item} />;
                        })}
                    </InfiniteScroller>
                }
            </div>
        );
    }
}

export default ActivityList;