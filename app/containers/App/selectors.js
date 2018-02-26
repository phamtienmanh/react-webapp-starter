/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectApp = () => createSelector(
  selectGlobal,
  (routeState) => routeState.get('app').toJS()
);

export {
  selectGlobal,
  makeSelectApp,
};
