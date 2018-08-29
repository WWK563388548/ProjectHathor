import React from 'react';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';

class ActiivityDetailChat extends React.Component {
    render() {
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
    
                        <Comment>
                            <Comment.Avatar src="/assets/user.png" />
                            <Comment.Content>
                                <Comment.Author as="a">Shuo Yang</Comment.Author>
                                <Comment.Metadata>
                                    <div>2018/08/31 12:30AM</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <p>
                                        This has been very useful for my research. Thanks as well!
                                    </p>
                                </Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>回复</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            <Comment.Group>
                                <Comment>
                                    <Comment.Avatar src="/assets/user.png" />
                                    <Comment.Content>
                                        <Comment.Author as="a">ZiWei Yao</Comment.Author>
                                        <Comment.Metadata>
                                            <div>2018/09/12 12:30AM</div>
                                        </Comment.Metadata>
                                        <Comment.Text>Nice! :)</Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action>回复</Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            </Comment.Group>
                        </Comment>
    
                        <Comment>
                            <Comment.Avatar src="/assets/user.png" />
                            <Comment.Content>
                                <Comment.Author as="a">Lian Li</Comment.Author>
                                <Comment.Metadata>
                                    <div>2018/09/14</div>
                                </Comment.Metadata>
                                <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>回复</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
    
                        <Form reply>
                            <Form.TextArea />
                            <Button
                                content="发表内容"
                                labelPosition="left"
                                icon="edit"
                                primary
                            />
                        </Form>
                    </Comment.Group>
                </Segment>
            </div>
        );
    }
}

export default ActiivityDetailChat;