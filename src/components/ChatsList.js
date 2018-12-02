import React from 'react';
import './App.css';
import avatar0 from "./images/morty.svg";
import avatar1 from "./images/rick.svg";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
                            <img src={avatar0} alt={1}/>
                            <Link to='/chat0'><h4>{this.props.store.chats[0].title}</h4></Link>
                            <div id="unreadMessages1" className="numberOfUnreadMessages"><span className="number">{this.props.store.chats[0].unread}</span></div>
                        </div>
                        <hr width="330px" size="1px" color="#8e24aa" align="right"/>
                        <div className="chat">
                            <img src={avatar1} alt={2}/>
                            <Link to='/chat1'><h4>{this.props.store.chats[1].title}</h4></Link>
                            <div id="unreadMessages1" className="numberOfUnreadMessages"><span className="number">{this.props.store.chats[1].unread}</span></div>
                        </div>
                        <hr width="330px" size="1px" color="#8e24aa" align="right"/>
                    </div>
                </div>
            </div>
        );
    }
}



export default connect(
    state =>({
        store: state
    }),
    dispatch => ({})
)(ChatsList);
