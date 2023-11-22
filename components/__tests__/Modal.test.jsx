// Modal.test.jsx

import React from 'react';
import { fireEvent, render, screen,waitFor,toHaveLength } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Modal, Room, CreateFile, LoadFileViewer } from '../Modal';

test('renders Modal without crashing', () => {
  render(<Modal>Test Content</Modal>);
  const modal = screen.getByText('Test Content');
  expect(modal).toBeInTheDocument();
});

test('renders Room Modal without crashing', () => {
    const CloseHandler = jest.fn();
    const RoomHandler = jest.fn();
    render(<Room state={1} CloseHandler={CloseHandler} RoomHandler={RoomHandler} />);
  
    const roomNameInput = screen.getByPlaceholderText('Room Name');
    const closeButton = screen.getByText('Close');
    const joinButton = screen.getByText('Join');
  
    expect(roomNameInput).toBeInTheDocument();
  
    fireEvent.change(roomNameInput, { target: { value: 'TestRoom' } });
    fireEvent.click(joinButton);
  
    expect(RoomHandler).toHaveBeenCalledWith('TestRoom');
  
    fireEvent.click(closeButton);
    expect(CloseHandler).toHaveBeenCalledWith(0);
  });

  test('renders CreateFile Modal without crashing', () => {
    const CloseHandler = jest.fn();
    const FileHandler = jest.fn();
    render(<CreateFile CloseHandler={CloseHandler} FileHandler={FileHandler} />);
  
    const filenameInput = screen.getByPlaceholderText('Filename');
    const closeButton = screen.getByText('Close');
    const createButton = screen.getByText('Create');
  
    expect(filenameInput).toBeInTheDocument();
  
    fireEvent.change(filenameInput, { target: { value: 'TestFile' } });
    
    fireEvent.click(createButton);
    expect(FileHandler).toHaveBeenCalledWith('TestFile');
    expect(CloseHandler).toHaveBeenCalled();
    
    fireEvent.click(closeButton);
    expect(CloseHandler).toHaveBeenCalled();
  });


  jest.mock('@/app/lib/firebase', () => ({
    GetUserFiles: jest.fn().mockResolvedValue({ exists: () => true, data: () => ({ files: ['File1', 'File2'] }) })
  }));
  
  test('renders LoadFileViewer Modal without crashing', async () => {
    const CloseHandler = jest.fn();
    const LoadHandler = jest.fn();
    render(<LoadFileViewer uid="user123" CloseHandler={CloseHandler} LoadHandler={LoadHandler} />);
  
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();
  
    fireEvent.click(closeButton);
    expect(CloseHandler).toHaveBeenCalled();
  

  
    await waitFor(() => {
      const fileButtons = screen.getAllByRole('button');
      expect(fileButtons).toHaveLength(3);
  
      fireEvent.click(fileButtons[0]);
      expect(LoadHandler).toHaveBeenCalledWith('File1');
    });
  });