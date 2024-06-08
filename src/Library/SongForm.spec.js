import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SongsContext } from './SongsContext';
import SongForm from './SongForm';

const mockContextValues = {
  addSong: jest.fn(),
  editSong: jest.fn(),
  editingSong: { name: 'edited name', prompt: 'edited prompt' }
};

const renderWithProvider = (component, mockContextValues) => {
  return render(
    <SongsContext.Provider value={mockContextValues}>
      {component}
    </SongsContext.Provider>
  );
};

describe('SongForm', () => {
  it('renders correctly with create mode', () => {
    const mockSongs = {...mockContextValues};
    delete mockSongs.editingSong;
    const { getByTestId } = renderWithProvider(<SongForm />, mockSongs);
    expect(getByTestId('form-heading')).toBeInTheDocument();
    expect(getByTestId('song-name-input').value).toBe('');
    expect(getByTestId('song-prompt-input').value).toBe('');
  });

  it('renders correctly with edit mode', () => {
    const { getByTestId } = renderWithProvider(<SongForm />, mockContextValues);
    expect(getByTestId('form-heading').innerHTML).toBe('Edit Song');
    expect(getByTestId('song-name-input').value).toBe('edited name');
    expect(getByTestId('song-prompt-input').value).toBe('edited prompt');
  });

  xit('calls addSong with correct parameters when creating a song', () => {
    const { getByTestId } = renderWithProvider(<SongForm />, mockContextValues);
    fireEvent.change(getByTestId('song-name-input'), { target: { value: 'New Song' } });
    fireEvent.change(getByTestId('song-prompt-input'), { target: { value: 'New Prompt' } });
    fireEvent.click(getByTestId('save-btn'));
    expect(mockContextValues.addSong).toHaveBeenCalledWith({ name: 'New Song', prompt: 'New Prompt', createdAt: expect.any(Date) });
  });

  it('calls editSong with correct parameters when editing a song', () => {
    const { getByTestId } = renderWithProvider(<SongForm />, mockContextValues);
    fireEvent.click(getByTestId('save-btn'));
    expect(mockContextValues.editSong).toHaveBeenCalledWith({ name: 'edited name', prompt: 'edited prompt' });
  });
});
