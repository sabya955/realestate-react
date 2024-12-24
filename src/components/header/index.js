import React from 'react';
import { useState } from 'react';
import './index.css';

const NavBar = () => {
    const [showMenu,setShowMenu]=useState(false)

    return (
        <header>
            <nav className="nav">
                <h1>RealEstate</h1>
                <div className="link">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/properties">Properties</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="logo">
                    <button onClick={(evt) => setShowMenu(!showMenu) }>...</button>
                </div>
                {showMenu ? (<div className='dropDown'>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/properties">Properties</a>
                    <a href="/contact">Contact</a>
                </div>) : null}
            </nav>
        </header>
    );
};

export default NavBar;

