// UserDashBoard.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { GetUserFiles, LogOut, DeleteFile, DeleteFileData, SaveFile, CreateSession, CheckSession } from '@/app/lib/firebase';
import UserDashBoard from '../UserDashBoard';

// Mock the useRouter hook
jest.mock('next/navigation');
jest.mock('firebase/auth');
// Get a reference to the mock implementation

// Mock the firebase functions
jest.mock('@/app/lib/firebase', () => ({
  GetUserFiles: jest.fn().mockResolvedValue({ exists: () => true, data: () => ({ files: ['File1', 'File2'] }) }),
  onAuthStateChanged: jest.fn(),
  LogOut: jest.fn().mockResolvedValue(),
  DeleteFile: jest.fn().mockResolvedValue(),
  DeleteFileData: jest.fn().mockResolvedValue(),
  SaveFile: jest.fn().mockResolvedValue(),
  CreateSession: jest.fn().mockResolvedValue(),
  CheckSession: jest.fn().mockResolvedValue({ exists: () => true }),
}));

// Mock the useRouter implementation
const mockedPush = jest.fn();
useRouter.mockImplementation(() => ({ push: mockedPush }));

describe('UserDashBoard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state while waiting for user authentication', async () => {
    // Mock the user being not authenticated
    onAuthStateChanged.mockImplementation((auth, callback) => callback(null));

    render(<UserDashBoard />);

    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders user dashboard after authentication', async () => {
    // Mock the user being authenticated
    const mockUser = { uid: 'testUid', displayName: 'TestUser' };
    onAuthStateChanged.mockImplementation((auth, callback) => callback(mockUser));

    // Mock GetUserFiles response
    GetUserFiles.mockResolvedValueOnce({ exists: () => true, data: () => ({ files: ['File1', 'File2'] }) });

    render(<UserDashBoard />);

    // Assert that the welcome message is displayed
    const welcomeMessage = screen.getByText(/Welcome TestUser/i);
    expect(welcomeMessage).toBeInTheDocument();

  });

  test('handles file display', async () => {
    // Mock the user being authenticated
    const mockUser = { uid: 'testUid', displayName: 'TestUser' };
    onAuthStateChanged.mockImplementation((auth, callback) => callback(mockUser));

    // Mock GetUserFiles response
    GetUserFiles.mockResolvedValue({ exists: () => true, data: () => ({ files: ['File1', 'File2'] }) });

    render(<UserDashBoard />);

    // Click the delete button on the first file item
    
    
    // Assert that the DeleteFile and DeleteFileData functions are called
    await waitFor(() => {
      const files = screen.getAllByRole('button', { name: /Edit/i });
      expect(files).toHaveLength(2)
    });

  });



  test('handles file display', async () => {
    // Mock the user being authenticated
    const mockUser = { uid: 'testUid', displayName: 'TestUser' };
    onAuthStateChanged.mockImplementation((auth, callback) => callback(mockUser));

    // Mock GetUserFiles response
    GetUserFiles.mockResolvedValue({ exists: () => true, data: () => ({ files: ['File1', 'File2'] }) });

    render(<UserDashBoard />);
    let fileButtons;
    await waitFor(()=>{
      fileButtons = screen.getAllByRole('button', { name: /Delete/i });
    })
    fireEvent.click(fileButtons[0])

    await waitFor(() => {
      expect(DeleteFile).toHaveBeenCalledWith('testUid','File1');
      expect(DeleteFileData).toHaveBeenCalledWith('testUid','File1');
    });

  });

  // Add more tests for other user dashboard functionalities as needed
});
