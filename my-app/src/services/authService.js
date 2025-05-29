const authService = {
    signIn: async (email, password) => {
      // Replace with API call
      return email === 'test@example.com' && password === '123456';
    },
    signUp: async (email, password) => {
      // API call to register user
      console.log('Registering', email);
    },
    resetPassword: async (email) => {
      // API call to send password reset email
      console.log('Sending reset to', email);
    },
    signOut: () => {
      // Sign out logic
      console.log('Signed out');
    },
  };
  
  export default authService;