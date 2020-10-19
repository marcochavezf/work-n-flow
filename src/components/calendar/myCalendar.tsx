import React from 'react'

//Redux
import { connect } from 'react-redux';
import todoAction from '../../redux/todos/actions.js';

//Component Imports
import {DarkStyledCalendar} from './myCalendar.style'

//dayjs 
import dayjs from 'dayjs'; 

//helpers
import {getDateDaysAgo} from 'helpers/utility';

function calendar({daysAgo, updateDaysAgo}) {

  const dateSelected = getDateDaysAgo(daysAgo)

  function handleChange(date, event) {
    const todayDate = new Date()
    const newDaysAgo = dayjs(todayDate).diff(date, 'day')

    if(newDaysAgo >= 0){
      updateDaysAgo(newDaysAgo)
    }
    
  }

  return (
    <DarkStyledCalendar
      value={dateSelected}
      onChange={handleChange}
      maxDate={new Date()}
      prev2Label={null}
      next2Label={null}
      calendarType="US"
      locale="en"
      showNeighboringMonth={false}
      minDetail="month"
    />
  )
}

const {updateDaysAgo} = todoAction

export default connect(null, {updateDaysAgo})(calendar)
