import React, { useContext } from 'react';
import { SongsContext } from './SongsContext';
import styles from './SongList.module.css';
import editIcon from './../assets/edit.svg';
import trashIcon from './../assets/trash.svg';

const SongList = () => {
  const { songs, deleteSong, setEditing } = useContext(SongsContext);

  return (
    <div className={styles.song_list_container}>
      {
        songs.length ?
          songs.map((song) => (
            <div key={song.createdAt} className={styles.item}>
              <div className={styles.left_content}>
                <div style={{backgroundColor: song.color}} className={styles.cover_color}></div>
                <div className={styles.details}>
                  <div className={styles.title}>{song.name}</div>
                  <div className={styles.subtitle}>{song.prompt}</div>
                </div>
              </div>

              <div className={styles.right_content}>
                <button className={`${styles.btn} ${styles.btn_icon}`} onClick={() => deleteSong(song.createdAt)}>
                  <img src={editIcon} alt='edit' width="20" height="20" />
                </button>

                <button className={`${styles.btn} ${styles.btn_icon}`} onClick={() => setEditing(song)}>
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
