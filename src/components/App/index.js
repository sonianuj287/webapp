import React from 'react';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import AssignmentsPage from '../Assignments';
import LecturesPage from '../Lectures';
import QuizPage from '../Quiz';
import VideoUploadPage from '../VideoUpload';
import GradingPage from '../Grading';
// import AssignmentCheck from '../AssignmentCheck';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    {/* <div> */}
      
      {/* <Navigation /> */}

      {/* <hr /> */}
      <Navbar />
      <Switch>

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.ASSIGNMENTS} component={AssignmentsPage} />
      <Route exact path={ROUTES.LECTURES} component={LecturesPage} />
      <Route exact path={ROUTES.QUIZ} component={QuizPage} />
      <Route exact path={ROUTES.VIDEOUPLOAD} component={VideoUploadPage} />
      <Route exact path={ROUTES.GRADING} component={GradingPage} />
      {/* <Route exact path={ROUTES.ASSIGNMENTCHECK} component={AssignmentCheck}/> */}
      </Switch>
    {/* </div> */}
  </Router>
);

export default withAuthentication(App);



  
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route exact path={ROUTES.LANDING} component={LandingPage} />
//         <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
//         <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
//       </Switch>
//     </Router>
//   );
// }
  
// export default App;
