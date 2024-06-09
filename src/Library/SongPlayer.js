import React from 'react';
import styles from './SongPlayer.module.css'
import playIcon from './../assets/play-circle.svg';

const SongPlayer = () => {
  return (
  <div className={styles.song_player}>
      <img src={playIcon} alt='Play Song' width="40" height="40" />
    </div>
  )
}

export default SongPlayer;