import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import Popover from '../uielements/popover';
import IntlMessages from '../utility/intlMessages';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';

const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { profile } = this.props.auth;
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        {/*
        <a className="isoDropdownLink">
          <IntlMessages id="themeSwitcher.settings" />
        </a>
        <a className="isoDropdownLink">
          <IntlMessages id="sidebar.feedback" />
        </a>
        <a className="isoDropdownLink">
          <IntlMessages id="topbar.help" />
        </a>
        */}
        <a className="isoDropdownLink" onClick={this.props.logout}>
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <Avatar size="large" src={profile.profileImage}/>
          {/*
          <span className="userActivity online" />
          */}
        </div>
      </Popover>
    );
  }
}
export default connect(
  state => ({
    auth: state.Auth.toJS()
  }),
  { logout }
)(TopbarUser);
