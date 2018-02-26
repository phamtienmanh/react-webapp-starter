
import { createSelector } from 'reselect';

const selectUi = (state) => state.get('ui');

const selectSignIn = createSelector(
  selectUi,
  (state) => state.get('signin')
);

export {
  selectUi,
  selectSignIn,
};
