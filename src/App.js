import React from 'react';
import './App.css';
import avatar from './images/avatar.png'

class Messenger extends React.Component {
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
        <Title />
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
function Title() {
    return(
        <div className="title">
            <img className="avatar" src={avatar} alt="avatar"/>
            <p>
                <span className="name">Jennifer</span>
                <br/>was online 2 hours ago
            </p>
        </div>
    )
}


export default Messenger;
