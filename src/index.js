import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Messenger from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Messenger />,
    document.getElementById('root')
);
/* HELLO WORLS TEST CODE
ReactDOM.render(
<h1>Hello, world!</h1>,
document.getElementById('root')
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
