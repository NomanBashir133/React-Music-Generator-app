import React from 'react';
import SongList from './SongList';
import SongForm from './SongForm';
import SongPlayer from './SongPlayer'
import { SongsProvider } from './SongsContext';
import styles from './Library.module.css';

const Library = () => {
  return (
    <SongsProvider>
      <div className={styles.songs_container}>
        <div className={styles.song_listing}><SongList></SongList></div>
        <div className={styles.song_form}><SongForm></SongForm></div>
      </div>

      <div className={styles.song_player_container}>
        <SongPlayer></SongPlayer>
      </div>
    </SongsProvider>
  );
}

export default Library;