import React from 'react';
import { Map } from 'immutable';
import * as _ from 'lodash';

export const todoStatus = { 
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PENDING: 'pending',
}

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getLocalAuthData() {
  try {
    const idToken = localStorage.getItem('id_token');
    const profileString = localStorage.getItem('profile');
    const profile = _.isEmpty(profileString) ? null : JSON.parse(profileString);
    return new Map({ idToken, profile });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function filterTodos(todos, daysAgo = 0) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const daysAgoLowerLimit = (new Date(todayDate - dayInMilliseconds * daysAgo)).getTime()
  const daysAgoUpperLimit = (new Date(daysAgoLowerLimit + dayInMilliseconds)).getTime();
  return todos.filter(todo => {
    const createTime = new Date(todo.createTime);
    const createTimeMilliseconds = createTime.getTime();
    return daysAgoLowerLimit <= createTimeMilliseconds && createTimeMilliseconds <= daysAgoUpperLimit;
  });
}

export function sortTodos(todos) {
  return todos
    .sort((a, b) => {
      return new Date(a.createTime) - new Date(b.createTime);
    })
    .sort((a, b) => {
      const statusA = getStatus(a);
      const statusB = getStatus(b);
      if (statusA === todoStatus.COMPLETED 
       && statusB === todoStatus.COMPLETED) {
        return new Date(_.last(a.lastTimeStopped)) - new Date(_.last(b.lastTimeStopped));
      }
      if (statusA !== todoStatus.COMPLETED 
       && statusB !== todoStatus.COMPLETED) {
        return 0;
      }
      if (statusA !== todoStatus.COMPLETED) {
        return 1;
      }
      if (statusB !== todoStatus.COMPLETED) {
        return -1;
      }
    })
}

export function getTimeLabel(todo){
  const status = getStatus(todo);
  switch (status) {
    /* Check if the task is completed, if that's the case then get the last time it 
     * was stopped display how many hours and minutes (Completed 34 mins ago or 
     * Completed 2 hours and 34 mins ago).
     * If it was completed 24 hours or more ago then display the day and the hour it
     * was completed (12-05-18 5:38pm). */
    case todoStatus.COMPLETED:
      const completedTime = _.last(todo.lastTimeStopped);
      return (
        <span className="isoTodoDate">
          { timeDifference(completedTime) }
        </span>
      );
       

    /* if the block isn't completed then display the remaining time (in minutes and seconds) */
    case todoStatus.IN_PROGRESS:
    case todoStatus.PENDING:
      return (
        <div>
          <span className="isoTodoDate">
            Remaining time: 
            <b className="isoTodoRemainingTime">
              { getLabelRemainingTime(todo.remainingTime) }
            </b>
          </span>
          
        </div>
      );

    default:
      break;
  }
}

export function getStatus(todo) {
  let status = todoStatus.COMPLETED;
  if (todo.remainingTime > 0) {
    if (todo.lastTimeStarted.length > todo.lastTimeStopped.length) {
      status = todoStatus.IN_PROGRESS;
    } else {
      status = todoStatus.PENDING;
    }
  }
  return status;
}

function getLabelRemainingTime(millis){
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}


export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => num > 9 ? '' + num : '0' + num;
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const month = months[givenTime.getUTCMonth()];
      const day = number(givenTime.getUTCDate());
      const year = years ? (givenTime.getUTCFullYear() % 100) : (new Date()).getFullYear(); //current year
      const localeHoursMins = givenTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      return `Completed at ${day}-${month}-${year} ${localeHoursMins}`;
    }
    let timeLabel = '';
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      timeLabel = `${hours} hour${numberEnding(hours)} `;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      timeLabel += `${minutes} minute${numberEnding(minutes)} `;
    }
    if (_.isEmpty(timeLabel)) {
      timeLabel = 'a few seconds ';
    }
    return `Completed ${timeLabel} ago`;
  };
  return getTime();
}
