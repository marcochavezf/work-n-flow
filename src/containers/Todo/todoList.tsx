import React, { Component } from 'react';
import * as _ from 'lodash';
import { getStatus, sortTodos, todoStatus } from '../../helpers/utility.js';
import SingleTodo from './singleTodo';
import TimeBetweenTodos from './timeBetweenTodos';
import { TodoListWrapper } from './todo.style.js';

interface TodoListProps {
  todos: any;
  isLoading: boolean;
  daysAgo: any;
  changeTitle: any;
}

export default class TodoList extends Component<TodoListProps> {
  state = {
    search: 'All',
    playCompletedSound: false,
    playInterval: undefined,
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
            : sortedTodos.length > 0 ? sortedTodos.map((todo, index, todos) => 
          
                  <div key={todo.id}>
                    <SingleTodo key={todo.id}  todo={todo} {...this.props} playInterval={playInterval} setPlayInterval={this.setPlayInterval} />

                    <TimeBetweenTodos todos={todos} index={index} todo={todo} />
                  </div>
                 )
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
        <ScrollToBottomTodoListComponent daysAgo={daysAgo} totalTodos={sortedTodos.length} />
      </TodoListWrapper>
    );
  }
}

interface STBTLIProps {
  totalTodos: number;
  daysAgo: number;
}

class ScrollToBottomTodoListComponent extends Component<STBTLIProps> {

  prevTotalTodos : number = 0
  el: HTMLDivElement | null = null
  componentDidUpdate() {
    const { totalTodos, daysAgo } = this.props;
    //scroll to the bottom only when a new task is added
    if (this.prevTotalTodos < totalTodos && daysAgo <= 0) {
      this.scrollToBottom();
    }
    this.prevTotalTodos = totalTodos;
  }

  scrollToBottom() {
    if(this.el){
      this.el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return <div ref={el => { this.el = el; }} />
  }
}