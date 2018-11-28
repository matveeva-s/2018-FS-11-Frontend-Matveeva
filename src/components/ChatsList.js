import React from 'react';
import './App.css';
import avatar1 from "./images/morty.svg";
import avatar2 from "./images/rick.svg";
import { Link } from 'react-router-dom'

class ChatsList extends React.Component {
    render() {
        return (
            <div className="Messenger">
                <div className="header"/>
                <div className="title">
                    <input id="allMenuButton" type="button"/>
                    <h2>Please select chat:</h2>
                    <input id="searchButton" type="button"/>
                </div>
                <div className="result-scroll">
                    <div id="users" className="users">
                        <div className="chat">
                            <img className="avatar" src={avatar1}/>
                            <Link to='/chat1'><h4>Morty Smith</h4></Link>
                        </div>
                        <hr width="330px" size="1px" color="#8e24aa" align="right"/>
                        <div className="chat">
                            <img className="avatar" src={avatar2}/>
                            <Link to='/chat2'><h4>Rick Sanchez</h4></Link>
                        </div>
                        <hr width="330px" size="1px" color="#8e24aa" align="right"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatsList;