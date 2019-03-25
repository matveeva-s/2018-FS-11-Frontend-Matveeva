import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleAddEmoticon = this.handleAddEmoticon.bind(this);
        this.createInterlocutorMessage = this.createInterlocutorMessage.bind(this);
        this.handleClickEmoticon = this.handleClickEmoticon.bind(this);
    }
    handleAddFile(event) {
        this.state.file = event.target.files[0];
        const fileDiv = document.createElement('div');
        fileDiv.className = 'cloud';
        fileDiv.innerHTML = `<font color = 'black'>Added file:</font>` + this.state.file.name;
        document.getElementById('result').appendChild(fileDiv);
    }
    handleClickEmoticon(event) {
        document.querySelector('[contentEditable]').appendChild(event.target.cloneNode(true));
    }
    handleAddEmoticon(event) {
        const emoticonsDiv = document.createElement('div');
        emoticonsDiv.className = 'emoticonsField';
        let em = [];
        for (let i = 0; i < 6; i++){
            em[i] = document.createElement('img');
            em[i].className = 'emoticons bg' + (i+1).toString();
            emoticonsDiv.appendChild(em[i]);
            em[i].addEventListener("click", this.handleClickEmoticon)
        }
        document.getElementById('formButtons').appendChild(emoticonsDiv);
        emoticonsDiv.addEventListener("mouseleave", function (event) {
                emoticonsDiv.remove();
        });

    }
    handleAddImage(event) {
        this.state.file = event.target.files[0];
        const url = URL.createObjectURL(this.state.file);
        const imageDiv = document.createElement('img');
        imageDiv.className = 'preview';
        imageDiv.src = url;
        SendImage(url, this.state.file.name);
        document.getElementById('result').appendChild(imageDiv);
    }
    handleSubmit(event) {
        if (document.getElementById('contentEditableDiv').innerHTML === '') {
             event.preventDefault();
             return false;
        }
        const message = document.createElement('div');
        message.className = 'cloud';
        message.innerHTML = document.getElementById('contentEditableDiv').innerHTML;
        document.getElementById('contentEditableDiv').innerHTML = '';
        //SendMessage(message.innerText);
        this.props.AddMessage([this.props.chatId, message.innerText, true]);
        document.getElementById('result').appendChild(message);
        event.preventDefault();
        return false;
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
        //debugger;
        return (
            <div className="Messenger">
                <div className="header"/>
                <Title
                    name={state.name}
                    status={state.status}
                    avatar={state.avatar}
                />
                <div className="result-scroll">
                    <div id="result" className="result">
                        {
                            currChat.messages.map(message => {
                                if (message.own)
                                    return (
                                        <div className="cloud"> {message.text} </div>
                                    );
                                else
                                    return (
                                        <div className="interlocutorCloud"> {message.text} </div>
                                    );
                            })
                        }
                    </div>
                </div>
                <form id='form-input'>
                    <div id="contentEditableDiv" contentEditable="true" />
                    <div id="formButtons">
                        <button className="sendButton" onClick={this.handleSubmit}/>
                        <input  id="addEmoticon" className="addEmoticonButton" type="button" onClick={this.handleAddEmoticon} />
                        <input id="addFile" className="addFileButton" type="file" onChange={this.handleAddFile}/>
                        <input id="addImage" className="addImageButton" type="file" multiple accept="image/*" onChange={this.handleAddImage}/>
                    </div>
                </form>
                <button id="intMessageButton" onClick={this.createInterlocutorMessage}>Create Interlocutor Message</button>
            </div>
        );
    }
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
