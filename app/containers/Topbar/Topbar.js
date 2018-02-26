import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Layout } from 'antd';
import { createStructuredSelector } from 'reselect';
import TopbarWrapper from './topbar.style';
import TopbarUser from '../../components/topbar/topbarUser';
import { getCurrentTheme } from '../ThemeSwitcher/config';
import { themeConfig } from '../../config';
import { makeSelectApp } from '../../containers/App/selectors';
import actions from '../../redux/app/actions';

const { Header } = Layout;

class Topbar extends Component {
  render() {
    const { toggleCollapsed } = this.props;
    const customizedTheme = getCurrentTheme('topbarTheme', themeConfig.theme);
    const collapsed = this.props.app.collapsed && !this.props.app.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

Topbar.propTypes = {
  app: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    toggleCollapsed: () => dispatch(actions.toggleCollapsed()),
  };
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Topbar);
