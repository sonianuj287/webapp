import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import './Bar.css';
import logo from './logo.png';

const Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  );
  
const NavigationAuth = ({authUser}) => {
  return (

      <Nav className="bar__navigation">
        <Bars />
  
        <NavMenu>
          
          <div className="bar__home"><NavLink to={ROUTES.LANDING} activeStyle>
          <img src={logo} height='100' style={{alignSelf:'center'}} alt="logo"/>
          </NavLink>
          </div>


          <div className="bar__navigation-items">
                <ul>
                    <li><NavLink to={ROUTES.HOME} activeStyle>
                          Home
                        </NavLink>
                    </li>
                    <li> <NavLink to={ROUTES.ACCOUNT} activeStyle>
                            Account
                          </NavLink>
                    </li>
                    
                    <li><NavLink to={ROUTES.ASSIGNMENTS} activeStyle>
                          Assignments
                        </NavLink>
                    </li>
                    <li><NavLink to={ROUTES.LECTURES} activeStyle>
                          Courses
                        </NavLink>
                    </li>
                    <li><NavLink to={ROUTES.QUIZ} activeStyle>
                          Quiz
                        </NavLink>
                    </li>
                    <li><NavLink to={ROUTES.VIDEOUPLOAD} activeStyle>
                          VideoUpload
                        </NavLink>
          
                    </li>
                    <li><NavLink to={ROUTES.GRADING} activeStyle>
                          Grading
                        </NavLink>
          
                    </li>
                    <li><NavLink to={ROUTES.LIVECLASS} activeStyle>
                          LiveClass
                        </NavLink>
          
                    </li>
                    {authUser.roles.includes(ROLES.ADMIN) && (
                    <li><NavLink to={ROUTES.ADMIN} >
                  Admin
              </NavLink>
                    </li>
                    )}
                </ul>
            </div>
          <div className="space"/>
          <SignOutButton/>
        </NavMenu>
      </Nav>
  );
};

const NavigationNonAuth = () => {
    return (
      <>
        <Nav className="bar__navigation">
          <Bars />
    
          <NavMenu>
          <div className="bar__home"><NavLink to={ROUTES.LANDING} activeStyle>
          <img src={logo} height='100' style={{alignSelf:'center'}} alt="logo"/>
          </NavLink></div>
            <div className="bar__navigation-items">
                <ul>
                    <li>            <NavLink to={ROUTES.SIGN_IN} >
                Sign In
            </NavLink>
                    </li>
                  </ul>
            </div>
          </NavMenu>
        </Nav>
      </>
    );
  };
  
export default Navigation;