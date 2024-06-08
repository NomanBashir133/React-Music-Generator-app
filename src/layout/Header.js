import React from 'react';
import './Header.css';

const Header = ({ title }) => {
  return (
    <header className='header'>
      <h2>{title}</h2>
    </header>
  );
}

export default Header;