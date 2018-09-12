import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceInput extends React.Component {

    state = {
        scriptLoaded: false
    };

    handleScriptLoaded = () => {
        this.setState({scriptLoaded: true});
    }

    render(){
        console.log(this.props);
        const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props;
        return (
            <Form.Field error={touched && !!error} width={width}>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"
                    onLoad={this.handleScriptLoaded}
                />
                {this.state.scriptLoaded &&
                <PlacesAutocomplete 
                    inputProps={{...input, placeholder}}
                    options={options}
                    onSelect={onSelect}
                />}
                {touched && error && <Label pointing color='red'>{error}</Label>}
            </Form.Field>
        );
    }
}

export default PlaceInput;