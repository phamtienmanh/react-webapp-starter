/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themeConfig } from '../../config';
import themes from '../../config/themes';
import AppHolder from './commonStyle';
import { selectAuth } from '../../redux/auth/selectors';
import HomePage from '../Pages/Home/Loadable';
import NotFoundPage from '../Pages/NotFound/Loadable';
import SignInPage from '../Pages/SignIn/Loadable';

// eslint-disable-next-line no-shadow,react/prop-types
const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isLoggedIn
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: '/signin',
          // eslint-disable-next-line react/prop-types
          state: { from: props.location },
        }}
      />}
  />
);

const App = ({ auth }) => (<ThemeProvider theme={themes[themeConfig.theme]}>
  <AppHolder>
    <Switch>
      <RestrictedRoute exact path="/" component={HomePage} isLoggedIn={auth.get('isLoggedIn')} />
      {/* <Route */}
      {/* exact */}
      {/* path={'/404'} */}
      {/* component={asyncComponent(() => import('./containers/Page/404'))} */}
      {/* /> */}
      {/* <Route */}
      {/* exact */}
      {/* path={'/500'} */}
      {/* component={asyncComponent(() => import('./containers/Page/500'))} */}
      {/* /> */}
      <Route
        exact
        path={'/signin'}
        component={SignInPage}
      />
      {/* <Route */}
      {/* exact */}
      {/* path={'/signup'} */}
      {/* component={asyncComponent(() => import('./containers/Page/signup'))} */}
      {/* /> */}
      {/* <Route */}
      {/* exact */}
      {/* path={'/forgotpassword'} */}
      {/* component={asyncComponent(() => */}
      {/* import('./containers/Page/forgotPassword'))} */}
      {/* /> */}
      {/* <Route */}
      {/* exact */}
      {/* path={'/resetpassword'} */}
      {/* component={asyncComponent(() => */}
      {/* import('./containers/Page/resetPassword'))} */}
      {/* /> */}
      <Route path="" component={NotFoundPage} />
    </Switch>
  </AppHolder>
</ThemeProvider>);

App.propTypes = {
  auth: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = (state) => ({
  auth: selectAuth(state),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(compose(
  withConnect,
)(App));
