import React from 'react';
import {
    Link
} from "react-router-dom";
import Toggler from '../Sider/Toggler';
import './Bar.css';

const Bar = props =>(
    <header className="bar">
        <nav className="bar__navigation">
            <div className="bar__toggler">
                <Toggler click={props.togglerClickHandler}/>
            </div>
            <div className="bar__home"><Link to="/">Home</Link></div>
            <div className="space"/>
            <div className="bar__navigation-items">
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Bar;