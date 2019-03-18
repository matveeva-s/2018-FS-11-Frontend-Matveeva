import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleAddEmoticon = this.handleAddEmoticon.bind(this);
        this.createInterlocutorMessage = this.createInterlocutorMessage.bind(this);
        this.handleClickEmoticon = this.handleClickEmoticon.bind(this);
    }
    handleChange(event) {
        document.getElementById("hidden").value = document.getElementById("form-input").innerHTML;
        this.setState({value: event.target.value});
    }
    handleAddFile(event) {
        this.state.file = event.target.files[0];
        const fileDiv = document.createElement('div');
        fileDiv.className = 'cloud';
        fileDiv.innerHTML = `<font color = 'black'>Added file:</font>` + this.state.file.name;
        document.getElementById('result').appendChild(fileDiv);
    }
    handleClickEmoticon(event) {
        document.querySelector('[contenteditable]').appendChild(event.target.cloneNode(true));
    }
    handleAddEmoticon(event) {
        const emoticonsDiv = document.createElement('div');
        emoticonsDiv.className = 'emoticonsField';
        const em1 = document.createElement('img'); em1.className = 'em1'; emoticonsDiv.appendChild(em1);
        const em2 = document.createElement('img'); em2.className = 'em2'; emoticonsDiv.appendChild(em2);
        const em3 = document.createElement('img'); em3.className = 'em3'; emoticonsDiv.appendChild(em3);
        const em4 = document.createElement('img'); em4.className = 'em4'; emoticonsDiv.appendChild(em4);
        const em5 = document.createElement('img'); em5.className = 'em5'; emoticonsDiv.appendChild(em5);
        const em6 = document.createElement('img'); em6.className = 'em6'; emoticonsDiv.appendChild(em6);
        em1.addEventListener("click", this.handleClickEmoticon);
        em2.addEventListener("click", this.handleClickEmoticon);
        em3.addEventListener("click", this.handleClickEmoticon);
        em4.addEventListener("click", this.handleClickEmoticon);
        em5.addEventListener("click", this.handleClickEmoticon);
        em6.addEventListener("click", this.handleClickEmoticon);
        document.getElementById('result').appendChild(emoticonsDiv);
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
        if (document.getElementById('form-input').innerHTML === '') {
             event.preventDefault();
             return false;
        }
        const message = document.createElement('div');
        message.className = 'cloud';
        message.innerHTML = document.getElementById('form-input').innerHTML;
        document.getElementById('form-input').innerHTML = '';
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
                <input id="addFile" className="addFileButton" type="file" onChange={this.handleAddFile}/>
                <input id="addImage" className="addImageButton" type="file" multiple accept="image/*" onChange={this.handleAddImage}/>
                <input  id="addEmoticon" className="addEmoticonButton" type="button" onClick={this.handleAddEmoticon} />
                <form>
                    <div contentEditable="true" id="form-input" />
                    <button className="sendButton" onClick={this.handleSubmit}/>
                </form>
                <button onClick={this.createInterlocutorMessage}>Create Interlocutor Message</button>
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
