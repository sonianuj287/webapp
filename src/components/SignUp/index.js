import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import firebase from "firebase";

const SignUpPage = () => (
  <div style={{width:'70%',paddingLeft:'30%',paddingTop:'10%'}} >
  <div className="card m-3">
  <h1 className="card-header">Sign Up</h1>
    <SignUpForm />
  </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  link1:'',
  link2:'',
  qualification:'',
  subject:'',
  isAdmin: false,
  error: null,
  file: '',
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, link1, link2, qualification, subject, isAdmin, file } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    const db = firebase.firestore();

    

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        }),

        db.collection('Teacher').get().then(snap => {
          let s = snap.size;
            s = s+1;
          var q = "TCHLNG" + s;
        db.collection("Teacher")
       .doc(q)
       .set({
        courses: [],
        name: username,
        email: email,
        profileLink: link1,
        profileLink1: link2,
        qualifications: qualification,
        subject:subject,
        teacherId:q,
        teacherPhoto:'',
        verify: false,
       });
    
       });
      })

      .then(() => {
        return this.props.firebase.doSendEmailVerification(); 
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      link1,
      link2,
      qualification,
      subject,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' || link1 === '' || link2 === '' || qualification === '' || subject === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="link1"
          value={link1}
          onChange={this.onChange}
          type="text"
          placeholder="Facebook link"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="link2"
          value={link2}
          onChange={this.onChange}
          type="text"
          placeholder="LinkedIn link"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="qualification"
          value={qualification}
          onChange={this.onChange}
          type="text"
          placeholder="Qualifications"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="subject"
          value={subject}
          onChange={this.onChange}
          type="text"
          placeholder="Preferred subject"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
        style={{height:40,marginLeft:"25%",marginTop:20,borderRadius:5,width:'50%'}}
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {/* <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label> */}
        
        <br/>
        <br/>
        <br/>
        <button className="btn btn-primary" 
        style={{backgroundColor:"#2459d0",width:100,height:60,borderRadius:10,color:"white",marginLeft:'40%'}} disabled={isInvalid} type="submit">
        
        Sign Up {' '}

        
      </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
