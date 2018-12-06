import React from 'react';
import './App.css';
import Chat from './Chat.js'
import ChatsList from './ChatsList.js'
import AuthorizationPage from './AuthorizationPage.js'
import avatar0 from './images/morty.svg'
import avatar1 from './images/rick.svg'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'

const name0= "Morty Smith";
const name1= "Rick Sanchez";
const status0 = "online";
const status1 = "was online 2 hours ago";

function App () {
    return (
        <Switch>
            <Route exact path='/chats' component={ChatsList}/>
            <Route path='/chat0' component={Chat0}/>
            <Route path='/chat1' component={Chat1}/>
            <Route path='/' component={Authorization}/>
        </Switch>
    )
}

function Chat0() {
    return (
        <Chat name={name0} status={status0} avatar={avatar0} chatId={0}/>
    )
}

function Chat1() {
    return (
        <Chat name={name1} status={status1} avatar={avatar1} chatId={1}/>
    )
}

function Authorization() {
    return(
        <AuthorizationPage name={name1}/>
    )
}


export default App;