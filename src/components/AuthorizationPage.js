import React from 'react';
import './App.css';
import { connect } from 'react-redux';

class AuthorizationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this._addHandlers();
    }
    _addHandlers() {
        this.handleChangeLoginForm = this.handleChangeLoginForm.bind(this);
        this.handleChangePasswordForm = this.handleChangePasswordForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeLoginForm(event) {
        this.setState({login: event.target.value});
    }
    handleChangePasswordForm(event) {
        this.setState({password: event.target.value});
    }
    handleSubmit(event){
        if (this.state.login === '' || this.state.password === '') {
            return false;
        }
        this.props.TryAuth([this.state.login, this.state.password]);
        console.log("AUTH FROM STORE = ",this.props.indexStore.user[0].authorization);
        if (this.props.indexStore.user[0].authorization === true) {
            document.location.href = "/chats";
        }
        document.getElementById('loginForm').value = '';
        document.getElementById('passwordForm').value = '';
        //console.log("before setState(): ", this.state.login, this.state.password);
        //this.setState({login: ''});
        //this.setState({password: ''});

        this.state.login = '';
        this.state.password = '';
        //console.log("after setState(): ", this.state.login, this.state.password);
        event.preventDefault();
        return false;
    }
    render() {
        return (
            <div className="Messenger">
                <div className="header"/>
                <Title />
            <div className="resultForAuth">
                <h3>Enter login and password </h3>
                <form>
                    <input id="loginForm" className="authForm" placeholder="Login or phone" value = {this.state.value} onChange={this.handleChangeLoginForm}/>
                    <input id="passwordForm" type="password" className="authForm" placeholder="Password" value = {this.state.value} onChange={this.handleChangePasswordForm}/>
                    <button id="enterButton" onClick={this.handleSubmit}/>
                </form>
                <h3> Or sign in using VK or Instagram</h3>
                <button id="vkAuthButton"/>
                <button id="instaAuthButton"/>
            </div>
            </div>
        );
    }
}

function Title(props) {
    return(
        <div className="title">
            <p><span className="name"> Authorization</span></p>
        </div>
    )
}

export default connect(
    state =>({
        indexStore: state
    }),
    dispatch => ({
        TryAuth: (LoginAndPassword)=> {
            dispatch({type: 'AUTHORIZATION', payload: LoginAndPassword})
        }
    })
)(AuthorizationPage);
