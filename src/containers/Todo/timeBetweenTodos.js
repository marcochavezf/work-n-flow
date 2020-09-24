import React from 'react'
//icons
import  Lines  from '../../image/icons/alineacion-centrada.svg'

import { todoStatus, getTimeCompleted, getFirstTimeStarted } from '../../helpers/utility';
//dayjs 
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; 

function timeBetweenTodos({todos, index, todo}) {

  //extends dayjs plugin
  dayjs.extend(relativeTime);
  const isLastTodo = index === (todos.length - 1)
  const nextTodo = index + 1
  const getTimeResult = getTimeCompleted(todo)
  const todoTimeCompleted = getTimeResult !== todoStatus.UNCOMPLETED ? dayjs(getTimeResult) : getTimeResult
  const nextTodoFirstStart = !isLastTodo ?  getFirstTimeStarted(todos[nextTodo]) : undefined;
  
  const isTodoCompleted = todoTimeCompleted !== todoStatus.UNCOMPLETED

  if(!isLastTodo && isTodoCompleted && nextTodoFirstStart) {

    return (
      <div className='isoTimeBetweenTodoContainer'>
        <img src={Lines} className='isoLinesIcon' alt='Lines Icon' />
        <p className='isoBetweenTodoMessage'>
           { dayjs(nextTodoFirstStart).from(todoTimeCompleted, true) } has passed between these Tasks 
        </p>
        <img src={Lines} className='isoLinesIcon rotate' alt='Lines Icon' />
      </div>
    )
  } else {
    return (
      <p></p>
    )
  }
}

export default timeBetweenTodos
