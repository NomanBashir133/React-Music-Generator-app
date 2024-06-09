import React, { act } from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import SongList from './SongList';
import { SongsContext } from './SongsContext';
import { SONGS } from './songs.conts';

const mockDeleteSong = jest.fn();
const mockSetEditing = jest.fn();

const mockSongs = [...SONGS];

const renderWithProvider = async (component) => {
  await act(async () => {
    render(
      <SongsContext.Provider value={{ songs: mockSongs, deleteSong: mockDeleteSong, setEditing: mockSetEditing }}>
        { component }
      </SongsContext.Provider>
    );
  });
};

describe('SongList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders songs by createdAt in descending order', async () => {
    await renderWithProvider(<SongList />)

    const songTitles = screen.getAllByText(/Midnight Echoes|Whispering Pines/);
    expect(songTitles.length).toBe(2);

    expect(songTitles[0]).toHaveTextContent('Midnight Echoes');
    expect(songTitles[1]).toHaveTextContent('Whispering Pines');
  });

  it('calls deleteSong when delete button is clicked', async () => {
    await renderWithProvider(<SongList />)

    const deleteButtons = screen.getAllByTestId('delete-btn');
    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    expect(mockDeleteSong).toHaveBeenCalledWith(mockSongs[0].createdAt);
  });

 it('calls setEditing when edit button is clicked', async () => {
    await renderWithProvider(<SongList />)

    const editButtons = screen.getAllByTestId('edit-btn');
    await act(async () => {
      fireEvent.click(editButtons[0]);
    });
    
    expect(mockSetEditing).toHaveBeenCalledWith(mockSongs[0]);
  });
});
