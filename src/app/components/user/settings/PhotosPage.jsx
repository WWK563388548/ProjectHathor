import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card, Icon} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {toastr} from 'react-redux-toastr';
import {uploadProfileImage, deletePhoto, setAvatarPhoto} from '../userAction'

const actions = {
    uploadProfileImage,
    deletePhoto,
    setAvatarPhoto,
};

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
});

const query = ({auth}) => {
    console.log("check photo component query", auth);
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos',
        }
    ];
}

class PhotosPage extends Component {

    state = {
        files: [],
        fileName: '',
        preview: '',
        cropResult: null,
        image: {},
    }

    uploadImage = async () => {
        try{
            await this.props.uploadProfileImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success("Success!", '成功上传图片');
        }catch(error){
            toastr.error("Error", error.message);
        }
    }

    handlePhotoDelete = (photo) => async () => {
        // console.log("check delete photo", photo);
        try {
            this.props.deletePhoto(photo);
        } catch (error) {
            toastr.error("发生错误", error.message);
        }
    }

    handleSetAvatarPhoto = (photo) => async () => {
        // console.log("check photo", photo);
        try {
            this.props.setAvatarPhoto(photo);
        } catch (error) {
            toastr.error("发生错误", error.message);
        }
    }

    cancelCrop = () => {
        this.setState({
            files: [],
            image: {},

        });
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
        const {photos, profile, loading} = this.props;
        let filteredPhotos;
        if(photos){
            filteredPhotos = photos.filter(photo => {
                return photo.url !== profile.photoURL;
            });
        }
        // console.log(this.state);
        console.log("check photos url", this.props);
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
                            <div>
                                <img 
                                    style={{
                                        minHeight: "200px",
                                        minWidth: "200px",
                                    }} 
                                    src={this.state.cropResult}
                                    alt="image"
                                />
                                <Button.Group>
                                    <Button loading={loading}  onClick={this.uploadImage} style={{width: "100px"}} positive icon="check" />
                                    <Button disabled={loading} onClick={this.cancelCrop} style={{width: "100px"}} icon="close" />
                                </Button.Group>
                            </div>
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='所有的图片'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={profile.photoURL || '/public/assets/user.png'}/>
                        <Button positive>头像</Button>
                    </Card>
                    {photos && filteredPhotos.map((photo) => (
                        <Card key={photo.id}>
                            <Image
                                src={photo.url}
                            />
                            <div className='ui two buttons'>
                                <Button  onClick={this.handleSetAvatarPhoto(photo)} basic color='green'>设置</Button>
                                <Button onClick={this.handlePhotoDelete(photo)} basic icon='trash' color='red' />
                            </div>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        );
    }
}

export default compose(
    connect(mapState, actions),
    firestoreConnect(auth => query(auth))
)(PhotosPage);