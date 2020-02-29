import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";



axios.defaults.baseURL = "https://cooper-rails-backend.herokuapp.com/api/v1";


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
