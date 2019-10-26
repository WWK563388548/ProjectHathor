import React from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import cn from 'date-fns/locale/zh_cn';
import ActivityDetailChatForm from './ActivityDetailChatForm'

class ActiivityDetailChat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showReplyForm: false,
            selectedCommentId: null,
        };
    }

    handleOpenReplyForm = (id) => () => {
        this.setState({
            showReplyForm: true,
            selectedCommentId: id,
        });
    }

    handleCloseReplyForm = () => {
        this.setState({
            showReplyForm: false,
            selectedCommentId: null,
        });
    }

    render() {
        const { addActivityComment, activityId, activityChat } = this.props;
        const { showReplyForm, selectedCommentId } = this.state;
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
                        {activityChat && activityChat.map(comment => (
                            <Comment key={comment.id}>
                                <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
                                <Comment.Content>
                                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                                        {comment.displayName}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        <div>{distanceInWords(comment.date, Date.now(), { locale: cn })} 之前</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.texts}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>
                                            回复
                                        </Comment.Action>
                                        {showReplyForm && selectedCommentId === comment.id && (
                                            <ActivityDetailChatForm 
                                                addActivityComment={addActivityComment}
                                                activityId={activityId}
                                                form={`reply_${comment.id}`}
                                                closeForm={this.handleCloseReplyForm}
                                            />
                                        )}
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))}
                    </Comment.Group>
                    <ActivityDetailChatForm 
                        addActivityComment={addActivityComment}
                        activityId={activityId}
                        form={'newComment'}
                    />
                </Segment>
            </div>
        );
    }
}

export default ActiivityDetailChat;