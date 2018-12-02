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
            "authorization": true
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
        //console.log("UpdateReducer: action.payload = ", chatID);
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
