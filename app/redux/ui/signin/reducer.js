import { fromJS } from 'immutable';
import authActions from '../../auth/actions';

const initialState = fromJS({
  isSubmitting: false,
});

function signinReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return state.set('isSubmitting', true);
    case authActions.LOGIN_SUCCESS:
    case authActions.LOGIN_ERROR:
      return state.set('isSubmitting', false);
    default:
      return state;
  }
}

export default {
  signin: signinReducer,
};
