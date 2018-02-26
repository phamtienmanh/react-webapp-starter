/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Input, Button, Checkbox } from 'antd';
import Form from '../../../components/uielements/form';
// import Input from '../../components/uielements/input';
import SignInStyleWrapper from './style';
import messages from './messages';
import AuthActions from '../../../redux/auth/actions';
import NoAuthContainer from '../../NoAuthContainer/index';
import injectSaga from '../../../utils/injectSaga';
import authSaga from '../../../redux/auth/saga';
import { selectAuth } from '../../../redux/auth/selectors';
import { selectSignIn } from '../../../redux/ui/signin/selectors';

const FormItem = Form.Item;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 100 },
  },
};

export class SignInPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    redirectToReferrer: this.props.auth.get('isLoggedIn'),
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.auth.get('isLoggedIn') !== nextProps.auth.get('isLoggedIn') &&
      nextProps.auth.get('isLoggedIn') === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.login({
          email: values.email,
          password: values.password,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <NoAuthContainer>
        <SignInStyleWrapper className="isoSignInPage">
          <Helmet>
            <title>Sign In Page</title>
          </Helmet>
          <div className="isoLoginContentWrapper">
            <div className="isoLoginContent">
              <div className="isoLogoWrapper">
                <Link to="/dashboard">
                  <FormattedMessage {...messages.signInTitle} />
                </Link>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div className="isoSignInForm">
                  <FormItem
                    {...formItemLayout}
                    hasFeedback>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ],
                    })(<Input name="email" id="email" size={'large'}
                              placeholder={'Email'}/>)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your E-mail!',
                        },
                      ],
                    })(<Input type={'password'} name="password" id="password"
                              size={'large'} placeholder={'Password'}/>)}
                  </FormItem>

                  <div className="isoInputWrapper isoLeftRightComponent">
                    <FormItem {...formItemLayout} style={{ marginBottom: 0 }}>
                      {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                      })(
                        <Checkbox><FormattedMessage {...messages.signInRememberMe} /></Checkbox>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" size={'large'} loading={this.props.signin.get('isSubmitting')}>
                      <FormattedMessage {...messages.signInButton} />
                    </Button>
                  </div>

                  {/*<div className="isoInputWrapper isoOtherLogin">*/}
                  {/*<Button onClick={this.handleLogin} type="primary btnFacebook">*/}
                  {/*<FormattedMessage {...messages.signInFacebook} />*/}
                  {/*</Button>*/}
                  {/*<Button onClick={this.handleLogin} type="primary btnGooglePlus">*/}
                  {/*<FormattedMessage {...messages.signInGooglePlus} />*/}
                  {/*</Button>*/}
                  {/*</div>*/}
                  {/*<div className="isoCenterComponent isoHelperWrapper">*/}
                  {/*<Link to="/forgotpassword" className="isoForgotPass">*/}
                  {/*<FormattedMessage {...messages.signInForgotPass} />*/}
                  {/*</Link>*/}
                  {/*<Link to="/signup">*/}
                  {/*<FormattedMessage {...messages.signInCreateAccount} />*/}
                  {/*</Link>*/}
                  {/*</div>*/}
                </div>
              </Form>
            </div>
          </div>
        </SignInStyleWrapper>
      </NoAuthContainer>
    );
  }
}

SignInPage.propTypes = {
  location: PropTypes.any,
  history: PropTypes.any,
  auth: PropTypes.any,
  form: PropTypes.any,
  signin: PropTypes.any,
  login: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(AuthActions.login(data)),
  };
}

const mapStateToProps = (state) => ({
  auth: selectAuth(state),
  signin: selectSignIn(state),
});

const withSaga = injectSaga({ key: SignInPage.name, saga: authSaga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(Form.create()(SignInPage));
