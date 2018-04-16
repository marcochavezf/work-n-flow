import React, { Component } from 'react';
// import { compose } from 'redux'
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { isLoaded, firebaseConnect } from 'react-redux-firebase';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
import todoAction from '../../redux/todos/actions.js';
import TodoList from './todoList';
import TodoPaginator from './todoPaginator';
import { TodoWrapper } from './todo.style';
import { filterTodos } from '../../helpers/utility';
import * as _ from 'lodash';

const {
  // addTodo,
  editTodo,
  deleteTodo,
  allCompleted,
  deleteCompleted,
} = todoAction;
const { Header, Content } = Layout;

class ToDo extends Component {
  onClickListeners = [];
  state = {
    newTodo: '',
    daysAgo: 0
  }
  todoWrapperOnClick = () =>{
    this.onClickListeners.forEach(listener => listener());
  }
  registerLayoutOnClick = (callback) => {
    this.onClickListeners.push(callback);
  }
  render() {
    let { todos } = this.props;
    const {
      // todos,
      isLoading,
      colors,
      addTodo,
      editTodo,
      deleteTodo,
      allCompleted,
      deleteCompleted,
    } = this.props;
    // const addTodo = (todo) => {
    //   this.props.firebase.push('todos', {
    //     id: new Date(),
    //     todo: todo,
    //     createTime: new Date(),
    //     lastTimeStopped: [],
    //     lastTimeStarted: [],
    //     remainingTime: 1500000
    //   })
    // }
    if (!_.isArray(todos)) {
      todos =[];
    }
    const { daysAgo } = this.state;
    return (
      <Layout style={{ background: 'none' }}>
        <TodoWrapper className="isomorphicTodoComponent" onClick={this.todoWrapperOnClick}>
        <Content className="isoTodoContentBody">
            
          <TodoPaginator
            daysAgo={daysAgo}
            updateDaysAgo={(daysAgo) => this.setState({ daysAgo })}
          />
          <TodoList
              todos={filterTodos(todos || [], daysAgo)}
              isLoading={isLoading}
              daysAgo={daysAgo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              colors={colors}
              allCompleted={allCompleted}
              deleteCompleted={deleteCompleted}
              registerLayoutOnClick={this.registerLayoutOnClick}
            />
          </Content>
          <Header className="isoTodoHeader">
            { daysAgo === 0 && !isLoading ?
              <Input
                placeholder={'Type here for add a new todo'}
                value={this.state.newTodo}
                className="isoTodoInput"
                onChange={event => this.setState({ newTodo: event.target.value })}
                onPressEnter={event => {
                  this.setState({ newTodo: '' });
                  addTodo(event.target.value);
                }}
              />
              : <div></div>
            }
          </Header>
        </TodoWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  // const { todos } = state.firebase.ordered;
  const { todos } = state.firebase.data;
  const { colors } = state.Todos.toJS();
  // const { todos, colors } = state.Todos.toJS();
  return {
    todos: _.map(todos, (todo, id) => {
      return Object.assign(todo, { 
        id,
        lastTimeStarted: _.map(todo.lastTimeStarted),
        lastTimeStopped: _.map(todo.lastTimeStopped),
      });
    }),
    colors,
    isLoading: !isLoaded(todos)
  };
}
// export default connect(mapStateToProps, {
//   addTodo,
//   editTodo,
//   deleteTodo,
//   deleteCompleted,
//   allCompleted,
// })(ToDo);

export default compose(
  firebaseConnect(props => [
    { path: 'todos', queryParams: [
      // 'orderByKey'
    ] }
  ]),
  withHandlers({
    addTodo: props => todo => {
      return props.firebase.push('todos', {
        todo: todo,
        createTime: new Date().getTime(),
        lastTimeStopped: [],
        lastTimeStarted: [],
        remainingTime: 1500000
      });
    },
    editTodo: props => todo => {
      const todoId = todo.id;
      return props.firebase.set(`todos/${ todoId }`, _.omit(todo, ['id']));
    },
    deleteTodo: props => todo => {
      const todoId = todo.id;
      return props.firebase.remove(`todos/${ todoId }`);
    },
  }),
  connect(mapStateToProps, {
    // addTodo,
    // editTodo,
    // deleteTodo,
    deleteCompleted,
    allCompleted,
  })
)(ToDo)