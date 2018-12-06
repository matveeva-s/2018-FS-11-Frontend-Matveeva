import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

const initialState = {
    "user": [
        {
            "name": "Jerry Smith",
            "login": "jerry",
            "password": "123",
            "authorization": false
        }
    ],
    "chats": [
        {
            "id": 0,
            "title": "Morty Smith",
            "unread": 0,
            "isSelected": false
        },
        {
            "id": 1,
            "title": "Rick Sanchez",
            "unread": 0,
            "isSelected": false
        }
    ]
};

function Reducer(state = initialState, action) {
    if (action.type ==='ADD_UNREAD_MESSAGE') {
        const copy = state;
        var chatID = action.payload;
        copy.chats[chatID].unread++;
        return copy;
    }
    if (action.type === 'AUTHORIZATION') {
        const copy = state;
        var checkingLogin = action.payload[0];
        var checkingPassword = action.payload[1];
        if (checkingLogin === copy.user[0].login && checkingPassword === copy.user[0].password){
            copy.user[0].authorization = true;
        }
        return copy;
    }
    return state;
}

const store = createStore(Reducer,  window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    //console.log('subscribe', store.getState());
});

ReactDOM.render((
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
