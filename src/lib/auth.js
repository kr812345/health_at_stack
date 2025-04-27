import Cookies from 'js-cookie';
import { toast } from 'sonner';

const TOKEN_KEY = 'health_token';
const USER_KEY = 'health_user';

export const setAuthToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};

export const setUser = (user) => {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
};

export const getUser = () => {
  const user = Cookies.get(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export async function logout() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Redirect to login page after successful logout
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Failed to logout. Please try again.');
  }
}