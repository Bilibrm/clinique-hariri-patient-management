// MOCK AUTHENTICATION SERVICE
// This service simulates user authentication. When the backend is ready,
// you can replace the mock logic with actual API calls using the `apiClient`.

import apiClient from './api';

/**
 * Simulates a login request.
 * In a real application, this would send credentials to the server.
 * @param {string} username - The user's username (superadmin@superadmin.com)
 * @param {string} password - The user's password (superadmin123)
 * @returns {Promise<{success: boolean, token?: string, error?: string}>}
 */
export const login = async (username: string, password: string) => {
  console.log(`Attempting to log in with username: ${username}`);
  
  // To use the real API later, you would uncomment this block:
  /*
  try {
    const response = await apiClient.post('/login', { username, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('authToken', token);
      return { success: true, token };
    }
    return { success: false, error: 'No token received' };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
  */

  // --- MOCK LOGIC START ---
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'superadmin@superadmin.com' && password === 'superadmin123') {
        const mockToken = 'mock-jwt-token-for-superadmin-user-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        console.log('Mock login successful. Token stored.');
        resolve({ success: true, token: mockToken });
      } else {
        console.log('Mock login failed: Invalid credentials.');
        resolve({ success: false, error: 'Invalid credentials' });
      }
    }, 500); // Simulate network delay
  });
  // --- MOCK LOGIC END ---
};

/**
 * Logs the user out by removing the token from local storage.
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  console.log('User logged out. Token removed.');
};

/**
 * Checks if a user is currently authenticated.
 * @returns {boolean} - True if a token exists, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};
