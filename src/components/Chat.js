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
        this.createInterlocutorMessage = this.createInterlocutorMessage.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleAddFile(event) {
        this.state.file = event.target.files[0];
        const fileDiv = document.createElement('div');
        fileDiv.className = 'cloud';
        fileDiv.innerHTML = `<font color = 'black'>Added file:</font>` + this.state.file.name;
        document.getElementById('result').appendChild(fileDiv);
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
        if (this.state.value === '') {
            event.preventDefault();
            return false;
        }
        const message = document.createElement('div');
        message.className = 'cloud';
        message.innerText = this.state.value;
        //document.getElementById('result').appendChild(message);
        document.getElementById('form-input').value = '';
        //SendMessage(message.innerText);
        this.props.AddMessage([this.props.chatId, message.innerText, true]);
        this.state.value = '';
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
                <form onSubmit={this.handleSubmit}>
                    <input id="form-input" placeholder="Write a message here..." value = {state.value} onChange={this.handleChange}/>
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
