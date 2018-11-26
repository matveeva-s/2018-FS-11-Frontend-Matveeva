import React from 'react';
import './App.css';
import avatar1 from './images/morty.svg'
import avatar2 from './images/rick.svg'
import { Link } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'


const App = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Chats}/>
            <Route path='/chat1' component={Chat1}/>
            <Route path='/chat2' component={Chat2}/>
        </Switch>
    </main>
);

class Chats extends React.Component {
    render() {
        return (
            <div className="Messenger">
                <div className="header"/>
                <TitleChats />
                <div className="result-scroll">
                    <div id="users" className="users">
                      <div id="chat1">
                          <img className="avatar" src={avatar1} align="left"/>
                          <Link to='/chat1'><h4>Morty Smith</h4></Link>
                      </div>
                      <hr width="330px" size="1px" color="#8e24aa" align="right"/>
                      <div id="chat2">
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

class Chat1 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          value: '',
          file: ''
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
      this.state.value = '';
      event.preventDefault();
      return false;
  }

  render() {
    return (
      <div className="Messenger">
        <div className="header"/>
        <Title1/>
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

class Chat2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            file: ''
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
        this.state.value = '';
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="Messenger">
                <div className="header"/>
                <Title2 />
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

function TitleChats() {
    return(
        <div className="title">
            <input id="allMenuButton" type="button"/>
            <h2>Please select chat:</h2>
            <input id="searchButton" type="button"/>
        </div>

    )
}
function Title1() {
    return(
        <div className="title">
            <input id="backButton" type="button" />
            <img className="avatar" src={avatar1} alt="avatar"/>
            <p>
                <span className="name">Morty Smith</span>
                <br/>online
            </p>
            <input id="searchButton" type="button"/>
            <input id="menuButton" type="button"/>
        </div>
    )
}
function Title2() {
    return(
        <div className="title">
            <input id="backButton" type="button" onClick='location.href="http://codehelper.ru/"'/>
            <img className="avatar" src={avatar2} alt="avatar"/>
            <p>
                <span className="name">Rick Sanchez</span>
                <br/>was online 2 hours ago
            </p>
            <input id="searchButton" type="button"/>
            <input id="menuButton" type="button"/>
        </div>
    )
}


export default App;
