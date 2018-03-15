const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  login: ({ provider, email, password }) => ({
    type: authActons.LOGIN_REQUEST,
    provider,
    email,
    password
  }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
};
export default authActons;
