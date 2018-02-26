import { fromJS } from 'immutable';
import { getToken } from '../../utils/helpers/utility';
import actions from './actions';

const initState = fromJS({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
});

function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('accessToken', action.access_token)
        .set('refreshToken', action.refresh_token);
    case actions.SET_TOKEN_SUCCESS:
      return state.set('isLoggedIn', action.isLoggedIn);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}

export default {
  auth: authReducer,
};
