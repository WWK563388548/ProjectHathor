import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = (props) => {
    const {socialLogin} = props;
    return (
        <div>

            <Button onClick={() => socialLogin('facebook')} type="button" style={{ marginBottom: '10px' }} fluid color="facebook">
                <Icon name="facebook" /> Login with Facebook
            </Button>

            <Button type="button" fluid color="google plus">
                <Icon name="google plus" />
                Login with Google
            </Button>
        </div>
    );
}

export default SocialLogin;