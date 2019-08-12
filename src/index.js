import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import { configureStore } from './app/components/store/configurationStore'
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './app/components/util/ScrollToTop';
// import { loadActivities } from './app/components/activities/activityActions';

const store = configureStore();
// store.dispatch(loadActivities());

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                    <ReduxToastr position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" /> 
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

store.firebaseAuthIsReady.then(() => {
    render();
});
registerServiceWorker();
