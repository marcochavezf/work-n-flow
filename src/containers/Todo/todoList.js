import React, { Component } from 'react';
import * as _ from 'lodash';
import { getStatus, sortTodos, todoStatus } from '../../helpers/utility';
import SingleTodo from './singleTodo';
import { TodoListWrapper } from './todo.style';

export default class TodoList extends Component {
  state = {
    search: 'All',
    playCompletedSound: false,
    playInterval:null,
  }
  
  componentWillUnmount = () =>{
    const { playInterval } = this.state;
    if (playInterval) {
      clearInterval(playInterval);
    }
  }

  setPlayInterval = (playInterval) => {
    if (playInterval) {
      this.setState({ playInterval });
    } else {
      const { playInterval: prevPlayInverval } = this.state;
      clearInterval(prevPlayInverval);
      this.setState({ playInterval: null });
    }
  }

  onChange = (event) => {
    this.setState({ search: event.target.value });
  }
  componentDidUpdate(){
    const { todos, changeTitle } = this.props;
    if (!todos.find(todo => getStatus(todo) === todoStatus.IN_PROGRESS)) {
      changeTitle();
    }
  }
  render() {
    let indexCompletedTodos = 1;
    const { 
      todos, 
      isLoading, 
      daysAgo,
    } = this.props;
    const { playInterval } = this.state;
    const sortedTodos = sortTodos(todos);
    sortedTodos.forEach(todo => {
      const status = getStatus(todo);
      if (status === todoStatus.COMPLETED) {
        todo.indexCompleted = indexCompletedTodos++;
      }
    });
    return (
      <TodoListWrapper className="isoTodoContent">
        {/*
        <div className="isoTodoStatusTab">
          <RadioGroup
            value={this.state.search}
            onChange={this.onChange}
            className="isoTodoStatus"
          >
            <RadioButton value="All">All</RadioButton>
            <RadioButton value="Uncompleted">Uncompleted</RadioButton>
            <RadioButton value="Completed">Completed</RadioButton>
          </RadioGroup>
        </div>
        */}

        <div className="isoTodoListWrapper">
          { isLoading ? <h3 className="isoNoTodoFound">Loading...</h3>
            // : sortedTodos.length > 0 ? sortedTodos.map(todo => this.singleTodo(todo))
            : sortedTodos.length > 0 ? sortedTodos.map(todo => <SingleTodo key={todo.id} todo={todo} {...this.props} playInterval={playInterval} setPlayInterval={this.setPlayInterval} />)
            : daysAgo === 0 ? <h3 className="isoNoTodoFound">Add a new task</h3>
            : <h3 className="isoNoTodoFound">No tasks to display</h3> }
        </div>
        <div className="isoTodoFooter">
        {/*
          <Checkbox
            className="isoTodoCheckAll"
            checked={completed === selectedTodos.length}
            disabled={completed === selectedTodos.length}
            onChange={event => {
              notification('success', 'All Todos are Completed!!!', '');
              this.props.allCompleted();
            }}
          >
            Mark all as completed
          </Checkbox>

          {selectedTodos.length > 0 && completed === selectedTodos.length ? (
            <Button
              type="button"
              className="isoDeleteAll"
              onClick={event => {
                notification('success', 'All Completed Todos are Deleted', '');
                this.props.deleteCompleted();
              }}
            >
              {`Delete Completed (${completed})`}
            </Button>
          ) : (
            ''
          )}
        */}
        </div>
        <ScrollToBottomTodoListComponent totalTodos={ sortedTodos.length } />
      </TodoListWrapper>
    );
  }
}

class ScrollToBottomTodoListComponent extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    const { totalTodos } = this.props;
    //scroll to the bottom only when a new task is added
    if (this.prevTotalTodos < totalTodos) {
      this.scrollToBottom();
    }
    this.prevTotalTodos = totalTodos;
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  render() {
    return <div ref={el => { this.el = el; }} />
  }
}