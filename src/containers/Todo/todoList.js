import React, { Component } from 'react';
import * as _ from 'lodash';
import Button from '../../components/uielements/button';
import { getTimeLabel, getStatus, sortTodos, todoStatus } from '../../helpers/utility';
import {
  EditableComponent,
} from '../../components/';
import { TodoListWrapper } from './todo.style';

function setLastTimeStopped(todo) {
  const { remainingTime, lastTimeStarted, lastTimeStopped } = todo;
  if (getStatus(todo) === todoStatus.IN_PROGRESS) {
    const lastTimeStartedDate = new Date(_.last(lastTimeStarted));
    const newLastStoppedTime = new Date(lastTimeStartedDate.getTime() + remainingTime);
    lastTimeStopped.push(newLastStoppedTime.getTime());
  }
  return todo;
}

export default class TodoList extends Component {
  playInterval = null
  state = {
    search: 'All',
  }

  playTodo(todo, updateTodo) {
    if (this.playInterval) {
      return alert(`There's another To-Do in progress`);
    }
    const { lastTimeStarted } = todo;
    //initialize an interval
    const timeInterval = 1000;
    this.playInterval = setInterval(() => {
      //update remainingTime property each second
      let newRemainingTime = todo.remainingTime - timeInterval;
      if (newRemainingTime <= 0) {
        newRemainingTime = 0;
        this.pauseTodo(todo, updateTodo);
      }
      updateTodo('remainingTime', newRemainingTime);
    }, timeInterval);
    lastTimeStarted.push(new Date().getTime())
    updateTodo('lastTimeStarted', lastTimeStarted);
  }

  pauseTodo(todo, updateTodo) {
    const { lastTimeStopped } = todo;
    clearInterval(this.playInterval);
    lastTimeStopped.push(new Date().getTime());
    //TODO: we could update the remaining milliseconds here
    updateTodo('lastTimeStopped', lastTimeStopped);
    this.playInterval = null;
  }

  resetTodo(todo, updateTodo) {
    const newRemainingTime = 1000 * 60 * 25; //25 minutes
    updateTodo('remainingTime', newRemainingTime);
  }

  completeTodo(todo, updateTodo) {
    const { lastTimeStopped } = todo;
    lastTimeStopped.push(new Date().getTime());
    updateTodo('remainingTime', 0);
    updateTodo('lastTimeStopped', lastTimeStopped);
  }

  singleTodo(todo) {
    const { deleteTodo, editTodo, colors, registerLayoutOnClick, daysAgo } = this.props;
    const onDelete = () => {
      if (this.playInterval) {
        return alert(`There's a To-Do in progress`);
      }
      deleteTodo(todo);
    };
    const updateTodo = (key, value) => {
      todo[key] = value;
      editTodo(todo);
    };
    if (!this.playInterval) {
      setLastTimeStopped(todo);
    }
    const status = getStatus(todo);
    const colorByStatus = [todoStatus.PENDING, todoStatus.COMPLETED, todoStatus.IN_PROGRESS];
    const color = colors[colorByStatus.indexOf(status)];
    return (
      <div className="isoTodoList" key={todo.id}>
        <div
          style={{ backgroundColor: color }}
          className="isoColorChooser"
        />
        <div className="isoTodoContentWrapper">
          <span className="isoTodoDate">{getTimeLabel(todo)}</span>
          { status !== todoStatus.COMPLETED && daysAgo === 0 ? 
            <div>
              {status === todoStatus.PENDING ? 
                <Button
                  className="isoPlayIcon"
                  icon="caret-right"
                  type="button"
                  onClick={() => this.playTodo(todo, updateTodo)}
                /> :
                <Button
                  className="isoPlayIcon"
                  icon="pause"
                  type="button"
                  onClick={() => this.pauseTodo(todo, updateTodo)}
                /> 
              }
              {/*
              <Button
                className="isoResetIcon"
                icon="reload"
                type="button"
                onClick={() => this.resetTodo(todo, updateTodo)} 
              />
              <Button
                className="isoForwardIcon"
                icon="step-forward"
                type="button"
                onClick={() => this.completeTodo(todo, updateTodo)}
              />
              */}
            </div> : 
            <div></div>
          }
          <EditableComponent
            value={todo.todo}
            itemKey="todo"
            isCompleted={status === todoStatus.COMPLETED}
            onChange={updateTodo}
            registerLayoutOnClick={registerLayoutOnClick}
            resetTodo={() => this.resetTodo(todo, updateTodo)} 
            completeTodo={() => this.completeTodo(todo, updateTodo)}
          />
        </div>
        <Button
          className="isoTodoDelete"
          icon="close"
          type="button"
          onClick={onDelete}
        />
      </div>
    );
  }
  onChange = (event) => {
    this.setState({ search: event.target.value });
  }
  render() {
    const { todos, isLoading, daysAgo } = this.props;
    const sortedTodos = sortTodos(todos);
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
            : sortedTodos.length > 0 ? sortedTodos.map(note => this.singleTodo(note))
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