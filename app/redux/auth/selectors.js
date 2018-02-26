/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

const selectData = (state) => state.get('data');
const selectAuth = createSelector(
  selectData,
  (state) => state.get('auth')
);

export {
  selectData,
  selectAuth,
};
