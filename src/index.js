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
            "isSelected": false,
            "messages": [
                {
                    "text": "Hi Morty!",
                    "own": false
                },
                {
                    "text": "Hello!",
                    "own": true
                },
            ]
        },
        {
            "id": 1,
            "title": "Rick Sanchez",
            "unread": 0,
            "isSelected": false,
            "messages": [
                {
                    "text": "Hi Rick!",
                    "own": false
                },
                {
                    "text": "Wabulabadaba",
                    "own": true
                },
            ]
        }
    ]
};

function Reducer(state = initialState, action) {
    if (action.type ==='ADD_MESSAGE') {
        const copy = state;
        let chatId = action.payload[0];
        let text = action.payload[1];
        let own = action.payload[2];
        //console.log(chatId, messageText, self);
        if (own === false) copy.chats[chatId].unread++;
        copy.chats[chatId].messages.push({text,own});
        //console.log(copy.chats[chatId].messages);
        return copy;
    }
    if (action.type === 'UPDATE_UNREAD_MESSAGE') {
        const copy = state;
        var chatId = action.payload;
        copy.chats[chatId].unread = 0;
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
