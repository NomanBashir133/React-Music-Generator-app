import React, { useState, useEffect, useContext } from 'react';
import { SongsContext } from './SongsContext';
import styles from './SongForm.module.css';

const SongForm = () => {
  const { addSong, editSong, editingSong } = useContext(SongsContext);
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    setName(editingSong?.name ?? '' );
    setPrompt(editingSong?.prompt ?? '');
  }, [editingSong]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingSong) {
        editSong({ ...editingSong, name, prompt });
    } else {
        addSong({ name, prompt, createdAt: new Date() });
    }
    setName('');
    setPrompt('');
  };

  return (
    <div className={styles.form_card}>
      <h3 className={styles.text_align_center}>{editingSong ? 'Edit Song' : 'Create a Song'}</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
        <br /><br />
        <textarea value={prompt} rows='5' placeholder='Prompt' onChange={(e) => setPrompt(e.target.value)} required />
        <br /><br />
        <button type="submit">Save</button>
      </form>

    </div>
  );
}

export default SongForm;
