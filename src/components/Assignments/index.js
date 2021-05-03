import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

const AssignmentsPage = () => (
  <div>
    <h1>Assignments Page</h1>
    <p>The Assignments Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AssignmentsPage);