import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

class ActiivityDetailInfo extends React.Component {
    render() {
        return (
            <Segment.Group>
                <Segment attached="top">
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size="large" color="teal" name="info" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>活动的详细描述</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="calendar" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>活动时间</span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="marker" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <span>活动地点</span>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button color="teal" size="tiny" content="查看地图" />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActiivityDetailInfo;