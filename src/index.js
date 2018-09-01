import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { configureStore } from './app/components/store/configurationStore'
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import ScrollToTop from './app/components/util/ScrollToTop';

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
