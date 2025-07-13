// Stub context to avoid import errors after removing useAuthStore.js
export const useAuthContext = () => {
  const getInitialUser = () => {
    try {
      return JSON.parse(localStorage.getItem('chat-user')) || null;
    } catch {
      return null;
    }
  };
  const setAuthUser = (user) => {
    if (user) {
      localStorage.setItem('chat-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chat-user');
    }
  };
  return { authUser: getInitialUser(), setAuthUser };
};

export const AuthContextProvider = ({ children }) => children;
