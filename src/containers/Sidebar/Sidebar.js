import React, { Component } from 'react';
import * as _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isLoaded, firebaseConnect } from 'react-redux-firebase';
import clone from 'clone';
// import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
// import IntlMessages from '../../components/utility/intlMessages';
// import getDevSidebar from '../../customApp/sidebar';
import SidebarWrapper from './sidebar.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';
import { getTodosPath, getStatus, todoStatus } from '../../helpers/utility';
import lotusDisabled from '../../image/icons/lotus_disabled.png';
import lotusEnabled from '../../image/icons/lotus_enabled.png';

import Calendar from 'components/calendar/myCalendar';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0'
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle, overflow: 'overlay' }} {...props} />
    );
  }

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { app, toggleOpenDrawer, customizedTheme, totalCompletedTodos, isLoading, daysAgo } = this.props;
    const url = stripTrailingSlash(this.props.url);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };
    const submenuColor = {
      color: customizedTheme.textColor
    };
    const iconsPerRow = 4;
    const limitRows = 2;
    const numberOfRows = totalCompletedTodos <= (iconsPerRow * limitRows) ? limitRows : Math.ceil(totalCompletedTodos / iconsPerRow);
    const arrayNumberRows = Array.from(Array(numberOfRows).keys());
    const arrayIconsRow = Array.from(Array(iconsPerRow).keys());
    const arrayIconsRemaining = Array.from(Array(totalCompletedTodos % iconsPerRow).keys());
    const getIcon = (rowIndex, i) => (rowIndex * iconsPerRow + i + 1) <= totalCompletedTodos ? lotusEnabled : lotusDisabled;
    const getArrayIcons = (rowIndex) => (rowIndex + 1) > limitRows ? arrayIconsRemaining : arrayIconsRow;
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            {/* <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              <Menu.Item key="todo">
                <Link to={`${url}/todo`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-list" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.todos" />
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              getDevSidebar(url, submenuColor)
            </Menu> */}
            <div className="isoDashboardMenu">
            <span className="isoMenuHolder" style={submenuColor}>
              <span className="nav-text title-todo-sidebar">
                Todos
                </span>
            </span>
            {
              !collapsed ?
              <>
              <div>
                  { 
                    arrayNumberRows.map(rowIndex => 
                      <div key={rowIndex} className="row-todos">
                        {
                          getArrayIcons(rowIndex).map(i => <img key={i} width="45px" src={getIcon(rowIndex, i)} alt="icon" />)
                        }
                      </div>
                    )
                  }
                  {/* <div className="row-todos">
                    {
                      [1, 2, 3, 4].map(i => <img key={i} width="45px" src={lotusEnabled} alt="icon" />)
                    }
                  </div>
                  <div className="row-todos">
                    {
                      [1, 2, 3, 4].map(i => <img key={i} width="45px" src={lotusDisabled} alt="icon" />)
                    }
                  </div> */}
                  {/* <div className="row-todos">
                      {
                        [1,2,3,4].map(i => <img key={i} width="45px" src={lotusImg} alt="icon" />)
                      }
                    </div> */}
                </div>

                <Calendar daysAgo={daysAgo} />
                </>
                : ''
            }
            </div>

          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const todosPath = getTodosPath(ownProps);
  const [userId, todosKey, daysAgoKey] = todosPath.split('/');
  const userData = state.firebase.data[userId];
  const todos = _.has(userData, todosKey) ? userData[todosKey][daysAgoKey] : {};
  return {
    app: state.App.toJS(),
    isLoading: !isLoaded(todos) || !_.has(userData, todosKey),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
    totalCompletedTodos: _.filter(todos, todo => getStatus(todo) === todoStatus.COMPLETED).length,
  };
}

export default compose(
  firebaseConnect((props, store) => {
    const todosPath = getTodosPath(props);
    return [
      {
        path: todosPath, queryParams: [
          // 'orderByKey'
        ]
      }
    ]
  }),
  connect(
    mapStateToProps,
    { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
  )
)(Sidebar)