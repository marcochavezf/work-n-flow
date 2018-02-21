import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
import todoAction from '../../redux/todos/actions.js';
import TodoList from './todoList';
import { TodoWrapper } from './todo.style';

const {
  addTodo,
  editTodo,
  deleteTodo,
  allCompleted,
  deleteCompleted,
} = todoAction;
const { Header, Content } = Layout;

class ToDo extends Component {
  onClickListeners = [];
  state = {
    newTodo: ''
  }
  todoWrapperOnClick = () =>{
    console.log('onClick');
    this.onClickListeners.forEach(listener => listener());
  }
  registerLayoutOnClick = (callback) => {
    this.onClickListeners.push(callback);
  }
  render() {
    const {
      todos,
      colors,
      addTodo,
      editTodo,
      deleteTodo,
      allCompleted,
      deleteCompleted,
    } = this.props;
    return (
      <Layout style={{ background: 'none' }}>
        <TodoWrapper className="isomorphicTodoComponent" onClick={this.todoWrapperOnClick}>
        <Content className="isoTodoContentBody">
          <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              colors={colors}
              allCompleted={allCompleted}
              deleteCompleted={deleteCompleted}
              registerLayoutOnClick={this.registerLayoutOnClick}
            />
          </Content>
          <Header className="isoTodoHeader">
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
          </Header>
        </TodoWrapper>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { todos, colors } = state.Todos.toJS();
  return {
    todos,
    colors,
  };
}
export default connect(mapStateToProps, {
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
  allCompleted,
})(ToDo);
