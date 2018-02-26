import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Input from '../../components/uielements/input';
import todoAction from '../../redux/todos/actions.js';
import TodoList from './todoList';
import TodoPaginator from './todoPaginator';
import { TodoWrapper } from './todo.style';
import { filterTodos } from '../../helpers/utility';

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
    const {
      todos,
      colors,
      addTodo,
      editTodo,
      deleteTodo,
      allCompleted,
      deleteCompleted,
    } = this.props;
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
              todos={filterTodos(todos, daysAgo)}
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
            { daysAgo === 0  ?
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
