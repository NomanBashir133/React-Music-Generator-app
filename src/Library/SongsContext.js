import React, { createContext, useReducer, useState, useEffect } from 'react';
import { getAllSongs, addSongToDB, deleteSongFromDB, editSongInDB } from './SongsStorage';
import { generateRandomColor } from '../color-util';
import { SONGS } from './songs.conts';

export const SongsContext = createContext();

const ADD_SONG = 'ADD_SONG';
const DELETE_SONG = 'DELETE_SONG';
const EDIT_SONG = 'EDIT_SONG';
const SET_SONGS = 'SET_SONGS';

const songsReducer = (state, action) => {
  switch (action.type) {
    case SET_SONGS:
      return action.payload;
    case ADD_SONG:
      return [action.payload, ...state];
    case DELETE_SONG:
      return state.filter(song => song.createdAt !== action.payload);
    case EDIT_SONG:
      return state.map(song => song.createdAt === action.payload.createdAt ? action.payload : song);
    default:
      return state;
  }
};

export const SongsProvider = ({ children }) => {
  const [songs, dispatch] = useReducer(songsReducer, []);
  const [editingSong, setEditingSong] = useState(null);

  useEffect(() => {
    const initializeSongs = async () => {
        let loadedSongs = await getAllSongs();
        if (loadedSongs.length === 0) {
          const initialSongs = SONGS.sort((a, b) => a.age - b.age);
          for (const song of initialSongs) {
            await addSongToDB(song);
          }

          loadedSongs = initialSongs;
        }
        dispatch({ type: SET_SONGS, payload: loadedSongs });
    };
    initializeSongs();
}, []);

  const addSong = async (song) => {
    const songColor = generateRandomColor();
    song.color = songColor;
    await addSongToDB(song);
    dispatch({ type: ADD_SONG, payload: song });
  };

  const deleteSong = async (createdAt) => {
    await deleteSongFromDB(createdAt);
    dispatch({ type: DELETE_SONG, payload: createdAt });
    clearEditing();
  };

  const editSong = async (song) => {
    await editSongInDB(song);
    dispatch({ type: EDIT_SONG, payload: song });
    clearEditing();
  };

  const setEditing = (song) => {
    setEditingSong(song);
  };

  const clearEditing = () => {
    setEditingSong(null);
  };

  return (
    <SongsContext.Provider value={{ songs, addSong, deleteSong, editSong, setEditing, editingSong, clearEditing }}>
      {children}
    </SongsContext.Provider>
  );
};
