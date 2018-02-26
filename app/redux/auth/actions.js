const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SET_TOKEN_SUCCESS: 'SET_TOKEN_SUCCESS',
  login: ({ email, password }) => ({
    type: authActons.LOGIN_REQUEST,
    payload: { email, password },
  }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
};
export default authActons;
