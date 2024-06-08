import React from 'react';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <h2>{title}</h2>
    </header>
  );
}

export default Header;