import React from 'react';
import './App.css';
import Chat from './Chat.js'
import ChatsList from './ChatsList.js'
import avatar1 from './images/morty.svg'
import avatar2 from './images/rick.svg'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'

const name1= "Morty Smith";
const name2= "Rick Sanchez";
const status1 = "online";
const status2 = "was online 2 hours ago";

function App () {
    return (
        <Switch>
            <Route exact path='/' component={ChatsList}/>
            <Route path='/chat1' component={Chat1}/>
            <Route path='/chat2' component={Chat2}/>
        </Switch>
    )
}

function Chat1() {
    return (
        <Chat name={name1} status={status1} avatar={avatar1}/>
    )
}

function Chat2() {
    return (
        <Chat name={name2} status={status2} avatar={avatar2}/>
    )
}

export default App;
