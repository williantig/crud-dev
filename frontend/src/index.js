import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Screen from './screen';

import 'antd/dist/antd.css';
import './index.module.scss';

axios.defaults.baseURL = 'http://localhost:3000/api';

ReactDOM.render(
  <React.StrictMode>
    <Screen />
  </React.StrictMode>,
  document.getElementById('root')
);
