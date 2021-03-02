import React from 'react';
import './Toggler.css';

const Toggler = props => (
    <button className="toggler" onClick={props.click}>
        <div className="toogler__line"/>
        <div className="toogler__line"/>
        <div className="toogler__line"/>
    </button>
);

export default Toggler;