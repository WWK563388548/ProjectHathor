import React from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import ActivityDetailChatForm from './ActivityDetailChatForm'

class ActiivityDetailChat extends React.Component {
    render() {
        const { addActivityComment, activityId } = this.props;
        return (
            <div>
                <Segment
                    textAlign="center"
                    attached="top"
                    inverted
                    color="teal"
                    style={{ border: 'none' }}
                >
                    <Header>讨论区</Header>
                </Segment>
    
                <Segment attached>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar src="/assets/user.png" />
                            <Comment.Content>
                                <Comment.Author as="a">Kejun Chen</Comment.Author>
                                <Comment.Metadata>
                                    <div>2018/08/30 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>测试一下</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>回复</Comment.Action>
                                </Comment.Actions>
                                </Comment.Content>
                        </Comment>
                    </Comment.Group>
                    <ActivityDetailChatForm 
                        addActivityComment={addActivityComment}
                        activityId={activityId}
                    />
                </Segment>
            </div>
        );
    }
}

export default ActiivityDetailChat;