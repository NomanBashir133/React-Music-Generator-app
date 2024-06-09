import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SongsContext } from './SongsContext';
import SongForm from './SongForm';

const mockContextValues = {
  addSong: jest.fn(),
  editSong: jest.fn(),
  editingSong: { name: 'edited name', prompt: 'edited prompt' }
};

const renderWithProvider = async (component, mockContextValues) => {
  await act(async () => {
    render (
      <SongsContext.Provider value={mockContextValues}>
        {component}
      </SongsContext.Provider>
      );
    });
};

describe('SongForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with create mode', async () => {
    const mockSongs = {...mockContextValues};
    delete mockSongs.editingSong;
    
    await renderWithProvider(<SongForm />, mockSongs);
    
    expect(screen.getByTestId('form-heading')).toBeInTheDocument();
    expect(screen.getByTestId('song-name-input').value).toBe('');
    expect(screen.getByTestId('song-prompt-input').value).toBe('');
  });

  it('renders correctly with edit mode', async () => {
    await renderWithProvider(<SongForm />, mockContextValues);
    
    expect(screen.getByTestId('form-heading').innerHTML).toBe('Edit Song');
    expect(screen.getByTestId('song-name-input').value).toBe('edited name');
    expect(screen.getByTestId('song-prompt-input').value).toBe('edited prompt');
  });

  it('calls addSong with correct parameters when creating a song', async () => {
    const mockSongs = {...mockContextValues};
    delete mockSongs.editingSong;
    await renderWithProvider(<SongForm />, mockSongs);
    
    fireEvent.change(screen.getByTestId('song-name-input'), { target: { value: 'New Song' } });
    fireEvent.change(screen.getByTestId('song-prompt-input'), { target: { value: 'New Prompt' } });
    fireEvent.click(screen.getByTestId('save-btn'));
    
    expect(mockContextValues.addSong).toHaveBeenCalledWith({ name: 'New Song', prompt: 'New Prompt', createdAt: expect.any(Date) });
  });

  it('calls editSong with correct parameters when editing a song', async () => {
    await renderWithProvider(<SongForm />, mockContextValues);
    
    fireEvent.click(screen.getByTestId('save-btn'));
    
    expect(mockContextValues.editSong).toHaveBeenCalledWith({ name: 'edited name', prompt: 'edited prompt' });
  });
});
