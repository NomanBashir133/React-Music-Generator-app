import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ routes }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRouteClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className={styles.tabs}>
        {routes.map((route) => (
          <div
            key={route.path}
            className={`${styles.tab} ${location.pathname === route.path ? styles.active : ''}`}
            onClick={() => handleRouteClick(route.path)}
          >
            {route.label}
          </div>
        ))}
      </div>
      <>
        {routes.map((route) => (
          <div key={route.path} style={{ display: location.pathname === route.path ? 'block' : 'none' }}>
            <route.component />
          </div>
        ))}
      </>
    </div>
  );
};

export default NavBar;
