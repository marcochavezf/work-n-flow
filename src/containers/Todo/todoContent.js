import React, { Component } from 'react';
import * as _ from 'lodash';
import { Layout } from 'antd';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { isLoaded, firebaseConnect } from 'react-redux-firebase';
import { getTodosPath, getTodoPath } from '../../helpers/utility';
import Input from '../../components/uielements/input';
import TodoList from './todoList.tsx';
import ContinueTodo from './continueTodo';
import TodoPaginator from './todoPaginator';
const { Header, Content } = Layout;

class TodoContent extends Component {
  
  state = {
    newTodo: ''
  }

  /*getInputRef(element){
    this.inputRef = element
  }*/
  
  render() {
    const {
      todos,
      isLoading,
      colors,
      addTodo,
      editTodo,
      deleteTodo,
      allCompleted,
      updateDaysAgo,
      deleteCompleted,
      daysAgo,
      playSound,
      changeTitle,
      registerLayoutOnClick,
      app
    } = this.props;
    
    const lastTodo = todos[todos.length - 1]
    const isMobile = app.view === 'MobileView';
    return (
      <div>
        <Content className="isoTodoContentBody">
          <TodoPaginator
            daysAgo={daysAgo}
            updateDaysAgo={updateDaysAgo}
          />
          <TodoList
            todos={todos}
            isLoading={isLoading}
            daysAgo={daysAgo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            colors={colors}
            playSound={playSound}
            changeTitle={changeTitle}
            allCompleted={allCompleted}
            deleteCompleted={deleteCompleted}
            registerLayoutOnClick={registerLayoutOnClick}
          />
        </Content>
        <Header className="isoTodoHeader">
          {daysAgo === 0 && !isLoading ?
          <div>
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
            <ContinueTodo 
              lastTodo={lastTodo} 
              isMobile={isMobile} 
              addTodo={addTodo}
              newTodo={this.state.newTodo} 
            />
            
          </div>
            : <div></div>
          }
        </Header>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const todosPath = getTodosPath(ownProps);
  const [ userId, todosKey, daysAgoKey ] = todosPath.split('/');
  const userData = state.firebase.data[userId];
  const todos = _.has(userData, todosKey) ? userData[todosKey][daysAgoKey] : {};
  return {
    app: state.App.toJS(),
    todos: _.map(todos, (todo, id) => {
      return Object.assign(todo, { 
        id,
        lastTimeStarted: _.map(todo.lastTimeStarted),
        lastTimeStopped: _.map(todo.lastTimeStopped),
      });
    }),
    isLoading: !isLoaded(todos) || !_.has(userData, todosKey)
  };
}

export default compose(
  firebaseConnect((props, store) => { 
    const todosPath = getTodosPath(props);
    return [
    { path: todosPath, queryParams: [
      // 'orderByKey'
    ] }
  ]}),
  withHandlers({
    addTodo: props => todo => {
      ReactGA.event({
        category: 'Todo',
        action: 'Add Todo',
      });
      const todosPath = getTodosPath(props);
      return props.firebase.push(todosPath, {
        todo: todo,
        createTime: new Date().getTime(),
        lastTimeStopped: [],
        lastTimeStarted: [],
        remainingTime: 1500000
      });
    },
    editTodo: props => todo => {
      const todoPath = getTodoPath(props.userId, todo);
      const todoId = todo.id;
      return props.firebase.set(`${ todoPath }/${ todoId }`, _.omit(todo, ['id']));
    },
    deleteTodo: props => todo => {
      const todoPath = getTodoPath(props.userId, todo);
      const todoId = todo.id;
      return props.firebase.remove(`${ todoPath }/${ todoId }`);
    },
  }),
  connect(mapStateToProps)
)(TodoContent)