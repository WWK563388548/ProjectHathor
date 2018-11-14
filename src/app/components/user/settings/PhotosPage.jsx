import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card, Icon} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class PhotosPage extends Component {

    state = {
        files: [],
        fileName: '',
        preview: '',
    }

    onDrop = (files) => {
        console.log(files);
        this.setState({
            files,
            fileName: files[0].name,
            preview: window.URL.createObjectURL(files[0]),
        });
        // console.log(this.state.files[0].preview);
    }

    render() {
        console.log(this.state);
        const style = {
            paddingTop: "30px",
            textAlign: "center",
        };
        return (
            <Segment>
                <Header dividing size='large' content='你的图片' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='第一步 - 添加图片'/>
                        <Dropzone onDrop={this.onDrop.bind(this)} multiple={false} >
                            <div style={style}>
                                <Icon name="upload" size="huge"/>
                                <h3>将图片拖至此处或点击添加图片</h3>
                            </div>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='第二步 - 裁剪图片' />
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='第三步 - 预览与上传图片' />
                        {this.state.files[0] &&
                            <img 
                                style={{
                                    minHeight: "200px",
                                    minWidth: "200px",
                                }} 
                                src={this.state.preview}
                                alt="image"
                            />
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='所有的图片'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                        <Button positive>头像</Button>
                    </Card>

                        <Card >
                            <Image
                                src='https://randomuser.me/api/portraits/men/20.jpg'
                            />
                            <div className='ui two buttons'>
                                <Button basic color='green'>设置</Button>
                                <Button basic icon='trash' color='red' />
                            </div>
                        </Card>
                </Card.Group>
            </Segment>
        );
    }
}

export default PhotosPage;