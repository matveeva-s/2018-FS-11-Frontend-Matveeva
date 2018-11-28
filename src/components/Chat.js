import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'

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
    _addHandlers() {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
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
        document.getElementById('result').appendChild(message);
        document.getElementById('form-input').value = '';
        SendMessage(message.innerText);
        this.state.value = '';
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="Messenger">
                <div className="header"/>
                <Title name={this.state.name} status={this.state.status} avatar={this.state.avatar}/>
                <div className="result-scroll">
                    <div id="result" className="result"/>
                </div>
                <input id="addFile" className="addFileButton" type="file" onChange={this.handleAddFile}/>
                <input id="addImage" className="addImageButton" type="file" multiple accept="image/*" onChange={this.handleAddImage}/>
                <form onSubmit={this.handleSubmit}>
                    <input id="form-input" placeholder="Write a message here..." value = {this.state.value} onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

function SendImage(url, name) {
    let formData = new FormData();
    formData.append("image", url, name);
    const myInit = {
        method: 'POST',
        body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then(response => console.log(response));
}


function SendMessage(message)
{
    let formData = new FormData();
    formData.append("message", message);
    const myInit = {
        method: 'POST',
        body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then(response => console.log(response));
}
function Title(props) {
    return(
        <div className="title">
            <Link to = '/'><button id="backButton"/></Link>
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
//<form method="link" action={"/"}></form>
export default Chat;