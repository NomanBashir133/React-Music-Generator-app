import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './layout/Header';
import NavBar from './layout/NavBar';
import Library from './Library/Library';
import './App.css';

const routes = [
  { path: '/songs', component: Library, label: 'Library' },
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
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
