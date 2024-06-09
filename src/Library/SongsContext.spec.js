import React, { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import { SongsContext, SongsProvider } from './SongsContext';
import { getAllSongs, addSongToDB, deleteSongFromDB, editSongInDB } from './SongsStorage';
import { generateRandomColor } from '../color-util';
import { SONGS } from './songs.conts';

jest.mock('./SongsStorage');
jest.mock('../color-util');

const mockSongs = [...SONGS];

describe('SongsProvider', () => {
  let contextValue;
  beforeEach(() => {
    getAllSongs.mockResolvedValueOnce(Promise.resolve(mockSongs));
    addSongToDB.mockResolvedValue(Promise.resolve());
    deleteSongFromDB.mockResolvedValue();
    editSongInDB.mockResolvedValue();
    generateRandomColor.mockReturnValue('#ffffff');
    jest.clearAllMocks();
    contextValue = null;
  });

  const setup = async () => {
    if (contextValue) return contextValue;

    const Consumer = () => {
      contextValue = React.useContext(SongsContext);
      return null;
    };

    await act( async () => {
      render(
        <SongsProvider>
          <Consumer />
        </SongsProvider>
      );
    });

    return contextValue;
  };

  it('initializes songs from storage', async () => {
    const { songs } = await setup();

    await waitFor(() => {
      expect(songs.length).toBe(mockSongs.length);
    });
  });

  it('adds a new song', async () => {
    const { addSong, songs } = await setup();
    const newSong = { name: 'New Song', createdAt: Date.now() };

    await waitFor(() => addSong(newSong));

    await waitFor(async() => {
      const updatedContextValue = await setup();
      const updatedSongs = updatedContextValue.songs;
      expect(updatedSongs).toContainEqual(expect.objectContaining(newSong));
    });

    expect(addSongToDB).toHaveBeenCalledWith(expect.objectContaining(newSong));
  });

  it('deletes a song', async () => {
    const { deleteSong, songs } = await setup();

    await waitFor(() => deleteSong(mockSongs[0].createdAt));

    await waitFor(async () => {
      const updatedContextValue = await setup();
      const updatedSongs = updatedContextValue.songs;
      expect(updatedSongs).not.toContainEqual(mockSongs[0]);
    });

    expect(deleteSongFromDB).toHaveBeenCalledWith(mockSongs[0].createdAt);
  });

  it('edits a song', async () => {
    const { editSong, songs } = await setup();
    const editedSong = { ...mockSongs[0], name: 'Edited Song' };

    await waitFor(() => editSong(editedSong));

    await waitFor(async () => {
      const updatedContextValue = await setup();
      const updatedSongs = updatedContextValue.songs;
      expect(updatedSongs).toContainEqual(expect.objectContaining(editedSong));
    });

    expect(editSongInDB).toHaveBeenCalledWith(expect.objectContaining(editedSong));
  });

  it('sets and clears editing song', async () => {
    const { setEditing, clearEditing, editingSong } = await setup();

    await waitFor(() => setEditing(mockSongs[0]));

    await waitFor(async () => {
      const updatedContextValue = await setup();
      const editingSong = updatedContextValue.editingSong;
      expect(editingSong).toEqual(mockSongs[0]);
    });

    await waitFor(() => clearEditing());

    await waitFor(async() => {
      const updatedContextValue = await setup();
      const editingSong = updatedContextValue.editingSong;
      expect(editingSong).toBeNull();
    });
  });
});
