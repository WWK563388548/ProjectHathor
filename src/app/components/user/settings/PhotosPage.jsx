import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card, Icon} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class PhotosPage extends Component {

    state = {
        files: [],
        fileName: '',
        preview: '',
        cropResult: null,
        image: {},
    }

    cropImage = () => {
        if(typeof this.refs.cropper.getCroppedCanvas() === 'undefined'){
            return;
        }
        this.refs.cropper.getCroppedCanvas().toBlob( blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image: blob
            });
        }, 'image/jpeg');
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
                        {this.state.files[0] &&
                            <Cropper
                                style={{
                                    height: 200,
                                    width: "100%",
                                }}
                                ref="cropper" 
                                src={this.state.preview}
                                aspectRatio={1}
                                viewMode={0}
                                dragMode="move"
                                guides={false}
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this.cropImage}
                            />
                        }
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
                                src={this.state.cropResult}
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