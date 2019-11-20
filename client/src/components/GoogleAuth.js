import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import history from '../history';

class GoogleAuth extends React.Component {

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '843397945162-1nfdlf2iciivfot0g2u9799mbe6mo1hd.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
        history.push('/')
    }


    renderAuthButton(){
       if(this.props.isSignedIn === null){
           return null;
       } else if( this.props.isSignedIn){
           return (
               <button onClick={this.onSignOutClick} className="ui red google button">
                   <i className="google icon" />
                   Sign Out
               </button>
           )
       } else {
        return (
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign In with Google
            </button>
        )
       }
    }

    render(){
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn}
}

export default connect (mapStateToProps, {signIn, signOut}) (GoogleAuth);