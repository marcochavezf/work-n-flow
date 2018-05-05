import React, { Component } from 'react';
import * as _ from 'lodash';
import Button from '../../components/uielements/button';
import { getTimeLabel, getLabelRemainingTime, getStatus, todoStatus } from '../../helpers/utility';
import {
  EditableComponent,
} from '../../components/';

export default class SingleTodo extends Component {
  interval = null;

  componentDidMount = () =>{
    const time = 30 * 1000; //30 seconds
    this.interval = setInterval(() => this.forceUpdate(), time);
  }
  componentWillUnmount = () =>{
    clearInterval(this.interval);
  }

  updateTodo = (todo, key, value) => {
    const { editTodo } = this.props;
    todo[key] = value;
    editTodo(todo);
  }

  onDeleteTodo = (todo) => {
    const { deleteTodo, playInterval } = this.props;
    if (playInterval) {
      return alert(`There's a To-Do in progress`);
    }
    deleteTodo(todo);
  };

  playTodo = (todo) => {
    const { playSound, playInterval, setPlayInterval } = this.props;
    if (playInterval) {
      return alert(`There's another To-Do in progress`);
    }
    const { lastTimeStarted } = todo;
    //initialize an interval
    const timeInterval = 1000;
    const newPlayInterval = setInterval(() => {
      //update remainingTime property each second
      let newRemainingTime = todo.remainingTime - timeInterval;
      if (newRemainingTime <= 0) {
        newRemainingTime = 0;
        this.pauseTodo(todo);
        playSound(todoStatus.COMPLETED);
      }
      this.updateTodo(todo, 'remainingTime', newRemainingTime);
    }, timeInterval);
    lastTimeStarted.push(new Date().getTime())
    this.updateTodo(todo, 'lastTimeStarted', lastTimeStarted);
    playSound(todoStatus.IN_PROGRESS);
    setPlayInterval(newPlayInterval);
  }

  pauseTodo = (todo) => {
    const { playSound, setPlayInterval } = this.props;
    const { lastTimeStopped } = todo;
    playSound(todoStatus.PENDING);
    setPlayInterval(null);
    lastTimeStopped.push(new Date().getTime());
    //TODO: we could update the remaining milliseconds here
    this.updateTodo(todo, 'lastTimeStopped', lastTimeStopped);
  }

  resetTodo(todo) {
    const newRemainingTime = 1000 * 60 * 25; //25 minutes
    this.updateTodo(todo, 'remainingTime', newRemainingTime);
  }

  completeTodo(todo) {
    const { lastTimeStopped } = todo;
    lastTimeStopped.push(new Date().getTime());
    this.updateTodo(todo, 'remainingTime', 0);
    this.updateTodo(todo, 'lastTimeStopped', lastTimeStopped);
  }

  setLastTimeStopped(todo) {
    const { remainingTime, lastTimeStarted, lastTimeStopped } = todo;
    if (getStatus(todo) === todoStatus.IN_PROGRESS) {
      const lastTimeStartedDate = new Date(_.last(lastTimeStarted));
      const newLastStoppedTime = new Date(lastTimeStartedDate.getTime() + remainingTime);
      lastTimeStopped.push(newLastStoppedTime.getTime());
    }
    return todo;
  }

  render() {
    const { 
      todo,
      colors, 
      registerLayoutOnClick, 
      daysAgo,
      changeTitle,
      playInterval,
    } = this.props;
    
    const status = getStatus(todo);
    const colorByStatus = [todoStatus.PENDING, todoStatus.COMPLETED, todoStatus.IN_PROGRESS];
    const color = colors[colorByStatus.indexOf(status)];

    if (!playInterval) {
      this.setLastTimeStopped(todo);
    }
    if (status === todoStatus.IN_PROGRESS) {
      const labelRemainingTime = getLabelRemainingTime(todo.remainingTime);
      changeTitle(labelRemainingTime);
    }
    const labelIndexCompletedTodo = todo.indexCompleted ? `${todo.indexCompleted}.` : '';
    return (
      <div className="isoTodoList" key={todo.id}>
        <div
          style={{ backgroundColor: color }}
          className="isoColorChooser"
        />
        <div className="isoTodoContentWrapper">
          <div>
            { labelIndexCompletedTodo ? <span className="isoTodoNumber">{labelIndexCompletedTodo}</span> : <div></div> }
            <span className="isoTodoDate">{getTimeLabel(todo)}</span>
          </div>
          { status !== todoStatus.COMPLETED && daysAgo === 0 ? 
            <div>
              {status === todoStatus.PENDING ? 
                <Button
                  className="isoPlayIcon"
                  icon="caret-right"
                  type="button"
                  onClick={() => this.playTodo(todo)}
                /> :
                <Button
                  className="isoPlayIcon"
                  icon="pause"
                  type="button"
                  onClick={() => this.pauseTodo(todo)}
                /> 
              }
              {/*
              <Button
                className="isoResetIcon"
                icon="reload"
                type="button"
                onClick={() => resetTodo(todo)} 
              />
              <Button
                className="isoForwardIcon"
                icon="step-forward"
                type="button"
                onClick={() => completeTodo(todo)}
              />
              */}
            </div> : 
            <div></div>
          }
          <EditableComponent
            value={todo.todo}
            itemKey="todo"
            isCompleted={status === todoStatus.COMPLETED}
            onChange={(key, value) => this.updateTodo(todo, key, value)}
            registerLayoutOnClick={registerLayoutOnClick}
            resetTodo={() => this.resetTodo(todo)} 
            completeTodo={() => this.completeTodo(todo)}
          />
        </div>
        <Button
          className="isoTodoDelete"
          icon="close"
          type="button"
          onClick={() => this.onDeleteTodo(todo)}
        />
      </div>
    );
  }
}