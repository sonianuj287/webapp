import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (

  <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
  <div className="card m-3">
  <h1 className="card-header">Sign In</h1>
    <SignInForm />
    <br/>
    {/* <SignInGoogle />
    <br/> */}
    <div className="card-footer text-center border-top-0">

    {/* <SignInFacebook /> */}
    {/* <SignInTwitter /> */}
    <PasswordForgetLink />
    <SignUpLink />
    </div>
  </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div >
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div className="form-group">
        <input
        style={{height:40,marginLeft:"25%",marginTop:10,borderRadius:5,width:'50%'}}
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <button className="btn btn-primary" 
        style={{backgroundColor:"#2459d0",width:100,height:60,borderRadius:10,color:"white",marginLeft:'40%'}}
         disabled={isInvalid} type="submit">
        
          Sign In {' '}

          <i className='fa fa-sign-in'></i> 
          
        </button>

        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button className="btn btn-secondary" type="submit" style={{backgroundColor:"gray",width:200,height:60,borderRadius:10,color:"white",marginLeft:'34%'}} >Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}



const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);


export default SignInPage;

export { SignInForm,
   SignInGoogle,
    // SignInFacebook,
    //  SignInTwitter
     };
