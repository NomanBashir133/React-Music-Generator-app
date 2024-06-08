import React from 'react';
import './SongPlayer.css'
import playIcon from './../assets/play-circle.svg';

const SongPlayer = () => {
  return (
    <div className='song-player'>
      <img src={playIcon} alt='Play Song' width="35" height="35" />
    </div>
  )
}

export default SongPlayer;