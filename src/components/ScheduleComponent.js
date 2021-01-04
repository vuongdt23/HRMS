import {enGB, is} from 'date-fns/locale';
import {DatePickerCalendar} from 'react-nice-dates';
import {Component, useContext, useState} from 'react';
import {getDay} from 'date-fns';
import userContext from '../context/usercontext';
import axios from 'axios';

const modifiers = {
  disabled: date => getDay (date) === 6, // Disables Saturdays
  highlight: date => {
    return getDay (date) === 2;
  }, // Highlights Tuesdays
};

const modifiersClassNames = {
  highlight: '-highlight',
};
function Schedule (props) {
  const user = useContext (userContext);
  const [employees, setEmployee] = useState(0);

  console.log ('user', user.user);
  if (!user.user.isLoggedin) {
    return (
      <div>
        Please login to access this function.
      </div>
    );
  } else {
    axios
      .get ('http://localhost:3000/employees/', {
        headers: {
          Authorization: `bearer ${user.user.token}`,
        },
      })
      .then (res => {
        setEmployee(JSON.stringify(res.data));
      })
      .catch (err => {
        console.log(err);
      });
    return (
      <div>
        <div>
          {employees}
        </div>
        <div>
          <DatePickerCalendar
            modifiers={modifiers}
            locale={enGB}
            modifiersClassNames={modifiersClassNames}
          />
        </div>
      </div>
    );
  }
}

export default Schedule;
