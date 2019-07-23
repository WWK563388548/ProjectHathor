import React from 'react';
import {Grid, Header, Image, Segment} from 'semantic-ui-react';
import Lazyload from 'react-lazyload';

const UserDetailPhotos = ({photos}) => {
    console.log("user detail header", photos);
    return (
        
         <Grid.Column width={12}>
         {photos && photos.map(photo => <img key={photo.id} url={photo.url} />)}
            <Segment attached>
                <Header icon='image' content='我的图片'/>
         
                <Image.Group size='small'>
                {photos && photos.map(photo => {
                    return (
                        <Lazyload
                            key={photo.id}
                            height={150}
                            placeholder={<Image size='small' url={'/assets/user.png'} />}
                        >
                            <Image size='large' src={photo.url} />
                        </Lazyload>
                    )
                })}
                    
                </Image.Group>
            </Segment>
        </Grid.Column>
    );
}

export default UserDetailPhotos;