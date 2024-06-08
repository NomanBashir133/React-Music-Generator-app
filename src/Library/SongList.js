import React, { useContext } from 'react';
import { SongsContext } from './SongsContext';
import './SongList.css';
import editIcon from './../assets/edit.svg';
import trashIcon from './../assets/trash.svg';

const SongList = () => {
  const { songs, deleteSong, setEditing } = useContext(SongsContext);

  return (
    <div className='song-list-container'>
      {
        songs.length ?
          songs.map((song) => (
            <div key={song.createdAt} className='item'>
              <div className='left-content'>
                <div style={{backgroundColor: song.color}} className='cover-color'></div>
                <div className='details'>
                  <div className='title'>{song.name}</div>
                  <div className='subtitle'>{song.prompt}</div>
                </div>
              </div>

              <div className='right-content'>
                <button className='btn btn-icon' onClick={() => deleteSong(song.createdAt)}>
                  <img src={editIcon} alt='edit' width="20" height="20" />
                </button>

                <button className='btn btn-icon' onClick={() => setEditing(song)}>
                  <img src={trashIcon} alt='delete' width="20" height="20" />
                </button>
              </div>
            </div>
          ))
          : <div>No songs found.</div>
      }
    </div>
  );
}

export default SongList;
