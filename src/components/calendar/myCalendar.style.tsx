import styled from 'styled-components';
//Component Imports
import Calendar from 'react-calendar';
//helper
import {transition} from 'config/style-util';

const styledCalendar = styled(Calendar)`
&.react-calendar {
  width: 210px;
  max-width: 100%;
  background: white;
  border: 1px solid #a0a096;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  margin: 20px 15px auto;
}
.react-calendar--doubleView {
  width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}
.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
&.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}
&.react-calendar button:enabled:hover {
  cursor: pointer;
}
.react-calendar__navigation {
  height: 44px;
  margin-bottom: 1em;
}
&.react-calendar__navigation__label {
 
  ${transition()}
}

.react-calendar__navigation button {
  min-width: 39px;
  background: none;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__navigation button[disabled] {
  background-color: #f0f0f0;
}
&.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}
.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
  abbr[title] {
    text-decoration: underline;
  }
}

.react-calendar__month-view__weekNumbers {
  font-weight: bold;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__days__day--neighboringMonth {
  color: #757575;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}
.react-calendar__tile {
  max-width: 100%;
  text-align: center;
  padding: 0.75em 0.5em;
  background: none;
}
.react-calendar__tile:disabled {
  background-color: #f0f0f0;
  color: #c3c3c3;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}
.react-calendar__tile--now {
  background: #ffff76;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}
.react-calendar__tile--hasActive {
  background: #76baff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}
.react-calendar__tile--active {
  background: #006edc;
  color: white;
}
.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

`





export const DarkStyledCalendar = styled(Calendar)`
&.react-calendar {
  width: 210px;
  max-width: 100%;
  border: 1px solid #a0a096;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  margin: 20px 13px auto 14px;
  background-image: initial;
  background: #1F2431;
  border-color: rgb(76, 83, 86);
  color: #F9F9F9;
}
.react-calendar--doubleView {
  width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}
.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
&.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}
&.react-calendar button:enabled:hover {
  cursor: pointer;
  background: #323a4f;
}
.react-calendar__navigation {
  height: 44px;
  margin-bottom: 1em;
}
&.react-calendar__navigation__label {
 
  ${transition()}
}

.react-calendar__navigation button {
  min-width: 39px;
  background: none;
}
.react-calendar__navigation button:enabled:hover {
  background-color: #323a4f;
}
.react-calendar__navigation button[disabled] {
  background-color: #08090d;
  color: #525252;
}
&.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
}
.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
  abbr[title] {
    text-decoration: none;
  }
}

.react-calendar__month-view__weekNumbers {
  font-weight: bold;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
}


.react-calendar__month-view__days__day--neighboringMonth {
  color: #757575;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}
.react-calendar__tile {
  max-width: 100%;
  text-align: center;
  padding: 0.75em 0.5em;
  background: none;
}
.react-calendar__tile:disabled {
  background-color: #08090d;
  color: #525252;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #323a4f;
}
.react-calendar__tile--now {
  background: #444427;
}
.react-calendar__tile.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #6b6b3e;
  color: white;
}
.react-calendar__tile--hasActive {
  background: #007fff;
}
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}
.react-calendar__tile--active {
  background: #006edc;
  color: white;
}
.react-calendar__tile.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
  background: #1087ff;
  
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

`


export default styledCalendar