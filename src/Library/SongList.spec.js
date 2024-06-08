import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SongList from './SongList';
import { SongsContext } from './SongsContext';

const mockDeleteSong = jest.fn();
const mockSetEditing = jest.fn();

const mockSongs = [
  {
    name: "Midnight Echoes",
    prompt: "Reflections under the starlight",
    color: "red",
    createdAt: "2024-05-06T17:00:00-07:00"
  },
  {
    name: "Whispering Pines",
    prompt: "Mystic trees in twilight's glow",
    color: "green",
    createdAt: "2024-05-06T17:00:00-05:00"
  },
];

describe('SongList', () => {
  it('renders songs by createdAt in descending order', async () => {
    await render(
      <SongsContext.Provider value={{ songs: mockSongs, deleteSong: mockDeleteSong, setEditing: mockSetEditing }}>
        <SongList />
      </SongsContext.Provider>
    );

    const songTitles = screen.getAllByText(/Midnight Echoes|Whispering Pines/);
    expect(songTitles.length).toBe(2);

    expect(songTitles[0]).toHaveTextContent('Midnight Echoes');
    expect(songTitles[1]).toHaveTextContent('Whispering Pines');
  });

  it('calls deleteSong when delete button is clicked', async () => {
    await render(
      <SongsContext.Provider value={{ songs: mockSongs, deleteSong: mockDeleteSong, setEditing: mockSetEditing }}>
        <SongList />
      </SongsContext.Provider>
    );

    const deleteButtons = screen.getAllByTestId('delete-btn');
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteSong).toHaveBeenCalledWith(mockSongs[0].createdAt);
  });

 it('calls setEditing when edit button is clicked', async () => {
    await render(
      <SongsContext.Provider value={{ songs: mockSongs, deleteSong: mockDeleteSong, setEditing: mockSetEditing }}>
        <SongList />
      </SongsContext.Provider>
    );

    const editButtons = screen.getAllByTestId('edit-btn');
    fireEvent.click(editButtons[0]);
    expect(mockSetEditing).toHaveBeenCalledWith(mockSongs[0]);
  });
});
