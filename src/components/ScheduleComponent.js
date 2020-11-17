import {enGB} from 'date-fns/locale';
import {DatePickerCalendar} from 'react-nice-dates';
import {Component} from 'react';
import {getDay} from 'date-fns';

const modifiers = {
  disabled: date => getDay (date) === 6, // Disables Saturdays
  highlight: date => getDay (date) === 2, // Highlights Tuesdays
};
const modifiersClassNames = {
  highlight: '-highlight',
};
class Schedule extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div>
        <DatePickerCalendar
          modifiers={modifiers}
          locale={enGB}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    );
  }
}
export default Schedule;
