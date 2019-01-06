import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import config from './components/config/config'
import store from './components/store';
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider>
          <App/>
      </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
