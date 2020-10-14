import React from 'react'

interface Props {
  isMobile: boolean;
  newTodo: string;
  lastTodo: any;
  addTodo: any;
}

function continueTodo({lastTodo, isMobile, newTodo, addTodo} : Props) {

  return (!lastTodo ? (
    <></> ) : isMobile ? ( 
      <div className='isoContinueTodoMobile' onClick={() => {addTodo(lastTodo.todo)}} > Or tap here to continue previous Todo </div> 
      ) : !newTodo ? (
    <div className="isoContinueTodoPlaceholder" onClick={() => {addTodo(lastTodo.todo)}} >
      Or click here to continue previous Todo
    </div>
  ) : (
    <div style={{display: 'none'}} ></div>
  ))
}

export default continueTodo
