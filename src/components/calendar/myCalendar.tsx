import React from 'react'

//Redux
import { connect } from 'react-redux';
import todoAction from '../../redux/todos/actions.js';

//Component Imports
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//dayjs 
import dayjs from 'dayjs'; 

//helpers
import {getDateDaysAgo} from 'helpers/utility';

function calendar({daysAgo, updateDaysAgo}) {

  /*const [dateSelected, setDateSelected] = React.useState(getDateDaysAgo(daysAgo))

  

  React.useEffect(() => {
    setDateSelected(getDateDaysAgo(daysAgo))
  }, [daysAgo])*/

  const dateSelected = getDateDaysAgo(daysAgo)

  function handleChange(date, event) {
    const todayDate = new Date()
    const newDaysAgo = dayjs(todayDate).diff(date, 'day')

    if(newDaysAgo >= 0){
      updateDaysAgo(newDaysAgo)
    }
    
  }

  return (
    <Calendar
      value={dateSelected}
      onChange={handleChange}
      maxDate={new Date()}
    />
  )
}

const {updateDaysAgo} = todoAction

export default connect(null, {updateDaysAgo})(calendar)
