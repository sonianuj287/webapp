import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut} style={{marginLeft:250,color:'#fff',backgroundColor:'#d9534f',borderColor:"d43f3a",borderRadius:"4px",
  padding:"6px 12px",fontSize:"14px",border:"1px solid transparent"}}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
