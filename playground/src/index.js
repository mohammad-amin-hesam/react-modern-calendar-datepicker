import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import { Calendar } from '../../src';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const defaultRange = {
    from: null,
    to: null,
  };

  const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);

  return (
    <>
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        shouldHighlightWeekends
        locale="fa"
        colorPrimary="#4156D9"
        colorPrimaryLight="#7A89E4"
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
