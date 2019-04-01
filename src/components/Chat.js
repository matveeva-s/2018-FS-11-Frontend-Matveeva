import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            status: props.status,
            avatar: props.avatar,
        };
        this._addHandlers();
    }
    componentWillMount() {
        this.props.UpdateUnreadMessage(this.props.chatId);
    }
    _addHandlers() {
        this.createInterlocutorMessage = this.createInterlocutorMessage.bind(this);
    }

    createInterlocutorMessage(event) {
        const message = document.createElement('div');
        message.className = 'interlocutorCloud';
        message.innerText = "СООБЩЕНИЕ СОБЕСЕДНИКА";
        document.getElementById('result').appendChild(message);
        this.props.AddMessage([this.props.chatId, message.innerText, false]);
        event.preventDefault();
        return false;
    }
    render() {
        const { state, props } = this;
        const chats = props.indexStore.chats;
        const currChat = chats[props.chatId];
        return (
            <div>
                <div className="header"/>
                <Title
                    name={state.name}
                    status={state.status}
                    avatar={state.avatar}
                />
                <Result
                    currChat={currChat}
                    store={this.props}
                    chatId = {this.props.chatId}
                />
                <Input
                    store={this.props}
                    chatId={this.props.chatId}
                />
                <button id="intMessageButton" onClick={this.createInterlocutorMessage}>Create Interlocutor Message</button>
            </div>
        );
    }
}

class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            emoticonFieldHidden: true
        };
        this._addHandlers();
    }

    _addHandlers() {
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleAddEmoticon = this.handleAddEmoticon.bind(this);
        // this.handleClickEmoticon = this.handleClickEmoticon.bind(this);
    }
    handleAddFile(event) {
        let file = "I added a file: " + event.target.files[0].name;
        this.props.store.AddMessage([this.props.chatId, file, true]);
    }
    handleSubmit(event){
        let newMessage = document.getElementById('contentEditableDiv').innerText;
        document.getElementById('contentEditableDiv').innerText = '';
        if (newMessage === '') {
            event.preventDefault();
            return;
        }
        //SendMessage(message.innerText);
        this.props.store.AddMessage([this.props.chatId, newMessage, true]);
        event.preventDefault();
    }
    handleAddEmoticon(event) {
        console.log("state.emoticonFieldHidden before click ", this.state.emoticonFieldHidden);
        this.state.emoticonFieldHidden = false;
        console.log("state.emoticonFieldHidden after click", this.state.emoticonFieldHidden);
    }
    render() {
        return(
            <form id='form-input'>
                <div id="contentEditableDiv" contentEditable="true" />
                <div id="formButtons">
                    <button className="sendButton" onClick={this.handleSubmit}/>
                    <EmoticonField hidden = {this.state.emoticonFieldHidden}/>
                    <input  id="addEmoticon" className="addEmoticonButton" type="button" onClick={(ev) => this.handleAddEmoticon(ev)} />
                    <input id="addFile" className="addFileButton" type="file" onChange={ev => this.handleAddFile(ev)}/>
                    <input id="addImage" className="addImageButton" type="file" multiple accept="image/*" onChange={(ev) => this.handleAddImage(ev)}/>
                </div>
            </form>
        );
    }
}
function EmoticonField(props) {
    {
        console.log("COME INTO EmotField", props.hidden);
        if (props.hidden === false)
            return(
                <div className='emoticonsField'>
                    <Emoticon num={1}/>
                    <Emoticon num={2}/>
                    <Emoticon num={3}/>
                    <Emoticon num={4}/>
                    <Emoticon num={5}/>
                    <Emoticon num={6}/>
                </div>);
        else
            return false;
    }
}
function Emoticon(props) {
    let name = 'emoticons bg' + props.num.toString();
    return (
        <img className={name}/>
    )
}
function Result(props) {
    return (
        <div className="result-scroll">
            <div id="result" className="result">
                {
                    props.store.indexStore.chats[props.chatId].messages.map(message => {
                        if (message.own) {
                            return (
                                <div className="cloud"> {message.text} </div>
                            );
                        }
                        else{
                            return (
                                <div className="interlocutorCloud"> {message.text} </div>
                            );

                        }
                    })
                }
            </div>
        </div>
    )
}


function Title(props) {
    return(
        <div className="title">
            <Link to = '/chats'><button id="backButton"/></Link>
            <img className="avatar" src={props.avatar} alt="avatar"/>
            <p>
                <span className="name">{props.name}</span>
                <br/>{props.status}
            </p>
            <input id="searchButton" type="button"/>
            <input id="menuButton" type="button"/>
        </div>
    )
}

function SendImage(url, name) {
    const formData = new FormData();
    formData.append("image", url, name);
    const myInit = {
        method: 'POST',
        body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then();
    //fetch(myRequest, myInit).then(response => console.log(response));
}
function SendMessage(message) {
    const formData = new FormData();
    formData.append("message", message);
    const myInit = {
        method: 'POST',
        body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then();
    //fetch(myRequest, myInit).then(response => console.log(response));
}

export default connect(
    state =>({
        indexStore: state
    }),
    dispatch => ({
      AddMessage: (payload)=> {
          dispatch({type: 'ADD_MESSAGE', payload: payload})
      },
      UpdateUnreadMessage: (chat_number) => {
          dispatch({type: 'UPDATE_UNREAD_MESSAGE', payload: chat_number})
      }
    })
)(Chat);
