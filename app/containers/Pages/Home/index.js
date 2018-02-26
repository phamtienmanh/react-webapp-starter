/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Button } from 'antd';
import AuthContainer from '../../AuthContainer/index';
import messages from './messages';
import ApiService from '../../../utils/apiService';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onClick = () => {
    ApiService.get('admin/api/users')
      .then((res) => {
        console.log('USERS 1', res);
        ApiService.get('admin/api/users')
          .then((res2) => {
            console.log('USERS 2', res2);
          });
      });
  };

  render() {
    return (
      <AuthContainer>
        <article>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="A React.js Boilerplate application homepage"/>
          </Helmet>
          <div>
            <FormattedMessage {...messages.startProjectHeader} />
          </div>
          <Button onClick={this.onClick}>Fetch!!!</Button>
        </article>
      </AuthContainer>
    );
  }
}

HomePage.propTypes = {};

export default compose()(HomePage);
