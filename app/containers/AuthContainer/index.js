import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import { Debounce } from 'react-throttle';
import { WindowResizeListener } from 'react-window-resize-listener';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import { siteConfig } from '../../config';
import { connect } from 'react-redux';
import { compose } from 'redux';
import appActions from '../../redux/app/actions';
const { Content, Footer } = Layout;

const AuthContainer = (props) => (<Content>
  <Helmet
    titleTemplate="%s - React.js Boilerplate"
    defaultTitle="React.js Boilerplate"
  >
    <meta name="description" content="A React.js Boilerplate application" />
  </Helmet>
  <Layout style={{ height: '100vh' }}>
    <Debounce time="1000" handler="onResize">
      <WindowResizeListener
        onResize={(windowSize) =>
            props.toggleAll(
              windowSize.windowWidth,
              windowSize.windowHeight
            )}
      />
    </Debounce>
    <Topbar />
    <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
      <Sidebar />
      <Layout
        className="isoContentMainLayout"
        style={{
          height: '100vh',
        }}
      >
        <Content
          className="isomorphicContent"
          style={{
            padding: '70px 0 0',
            flexShrink: '0',
            background: '#f1f3f6',
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            background: '#ffffff',
            textAlign: 'center',
            borderTop: '1px solid #ededed',
          }}
        >
          {siteConfig.footerText}
        </Footer>
      </Layout>
    </Layout>
  </Layout>
</Content>);

AuthContainer.propTypes = {
  children: PropTypes.any,
  toggleAll: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    toggleAll: (width, height) => dispatch(appActions.toggleAll(width, height)),
  };
}

const mapStateToProps = (state) => ({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
)(AuthContainer);
