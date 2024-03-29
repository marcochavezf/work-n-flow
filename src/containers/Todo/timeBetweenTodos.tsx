import React from 'react'
//icons
import { todoStatus, getTimeCompleted, getFirstTimeStarted } from 'helpers/utility';
//dayjs 
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; 

interface Props {
  todos: any[];
  index: number;
  todo: any;
}

function timeBetweenTodos({todos, index, todo} : Props) {

  //extends dayjs plugin
  dayjs.extend(relativeTime);
  const isLastTodo = index === (todos.length - 1)
  const nextTodo = index + 1
  const getTimeResult = getTimeCompleted(todo)
  const todoTimeCompleted = getTimeResult !== todoStatus.UNCOMPLETED ? dayjs(getTimeResult) : getTimeResult
  const nextTodoFirstStart = !isLastTodo ?  getFirstTimeStarted(todos[nextTodo]) : undefined;
  
  const isTodoCompleted = todoTimeCompleted !== todoStatus.UNCOMPLETED

  // Shows time only if nextTodo exits AND Todo has been completed AND next Todo has been started
  if(!isLastTodo && isTodoCompleted && nextTodoFirstStart) {

    return (
      <div className='isoTimeBetweenTodoContainer'>
        
        <p className='isoBetweenTodoMessage'>
          - { dayjs(nextTodoFirstStart).from(todoTimeCompleted, true) } has passed between these tasks -
        </p>
        
      </div>
    )
  } else {
    return (
      <p></p>
    )
  }
}

export default timeBetweenTodos
