import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';


describe('SongList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with title correctly', async () => {
    await render(<Header title='Library' />);

    expect(screen.getByText('Library')).toBeInTheDocument();
  });

});
