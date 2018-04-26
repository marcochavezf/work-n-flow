import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import todoAction from '../../redux/todos/actions.js';
import { TodoWrapper } from './todo.style';
import TodoContent from './todoContent';
import * as _ from 'lodash';
class ToDo extends Component {
  onClickListeners = [];
  todoWrapperOnClick = () => {
    this.onClickListeners.forEach(listener => listener());
  }
  registerLayoutOnClick = (callback) => {
    this.onClickListeners.push(callback);
  }
  render() {
    const {
      colors,
      updateDaysAgo,
      daysAgo,
    } = this.props;
    return (
      <Layout style={{ background: 'none' }}>
        <TodoWrapper className="isomorphicTodoComponent" onClick={this.todoWrapperOnClick}>
          <TodoContent
            colors={colors}
            daysAgo={daysAgo}
            updateDaysAgo={updateDaysAgo}
            registerLayoutOnClick={this.registerLayoutOnClick}
          />
        </TodoWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { colors, daysAgo } = state.Todos.toJS();
  return {
    colors,
    daysAgo,
  };
}

const {
  updateDaysAgo,
} = todoAction;
export default compose(
  connect(mapStateToProps, {
    updateDaysAgo,
  })
)(ToDo)