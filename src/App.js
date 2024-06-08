import { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Library from './Library/Library';
import './App.css';

const routes = [
  { path: '/songs', component: Library, label: 'Songs' },
  { path: '/playlists', component: () => (<div>Playlists placeholder</div>), label: 'Playlist' },
  { path: '/followers', component: () => (<div>Followers placeholder</div>), label: 'Followers' },
];


function App() {
  return (
    <Fragment>
      <Header title='Library'></Header>

      <BrowserRouter>
        <NavBar routes={routes}></NavBar>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component} />
          ))}
          <Route
              path="*"
              element={<Navigate to={routes[0].path} replace />}
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
