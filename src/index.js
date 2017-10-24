import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GagBox from './GagBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GagBox />, document.getElementById('root'));
registerServiceWorker();
