import React from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
// import { Debounce } from 'react-throttle';
// import { WindowResizeListener } from 'react-window-resize-listener';
// import Sidebar from '../Sidebar/Sidebar';
// import Topbar from '../Topbar/Topbar';
// import { siteConfig } from '../../config';

const { Content } = Layout;

const NoAuthContainer = (props) => (<Content>
  {props.children}
</Content>);

NoAuthContainer.propTypes = {
  children: PropTypes.any,
};

export default NoAuthContainer;
