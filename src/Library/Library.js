import React from 'react';
import SongList from './SongList';
import SongForm from './SongForm';
import SongPlayer from './SongPlayer'
import { SongsProvider } from './SongsContext';
import './Library.css';

const Library = () => {
  return (
    <SongsProvider>
      <div className='songs-container'>
        <div className='song-listing'><SongList></SongList></div>
        <div className='song-form'><SongForm></SongForm></div>
      </div>

      <div className='song-player-container'>
        <SongPlayer></SongPlayer>
      </div>
    </SongsProvider>
  );
}

export default Library;