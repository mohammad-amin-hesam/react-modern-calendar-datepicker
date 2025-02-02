import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import { DAY_SHAPE, TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

import { NewHeader, MonthSelector, YearSelector, DaysList } from './components';

const Calendar = ({
  value,
  onChange,
  onDisabledDayError,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  shouldHighlightWeekends,
}) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: false,
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
    };
  });

  const { getToday } = useLocaleUtils(locale);
  const { weekDays: weekDaysList } = useLocaleLanguage(locale);
  const today = getToday();

  const createStateToggler = property => () => {
    setMainState({ ...mainState, [property]: !mainState[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && value.length) return shallowClone(value[0]);
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && value.from) return shallowClone(value.from);
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const weekdays = weekDaysList.map(weekDay => (
    <abbr key={weekDay} title={weekDay} className="Calendar__weekDay">
      {weekDay[0]}
    </abbr>
  ));

  // const handleMonthChange = direction => {
  //   setMainState({
  //     ...mainState,
  //     monthChangeDirection: direction,
  //   });
  // };

  const updateDate = () => {
    setMainState({
      ...mainState,
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection),
      monthChangeDirection: '',
    });
  };

  // const selectMonth = newMonthNumber => {
  //   setMainState({
  //     ...mainState,
  //     activeDate: { ...activeDate, month: newMonthNumber },
  //     isMonthSelectorOpen: false,
  //   });
  // };

  // const selectYear = year => {
  //   setMainState({
  //     ...mainState,
  //     activeDate: { ...activeDate, year },
  //     isYearSelectorOpen: false,
  //   });
  // };

  return (
    <div
      className={`Calendar -noFocusOutline ${calendarClassName} -${locale}`}
      role="grid"
      style={{
        '--cl-color-primary': colorPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
        '--animation-duration': slideAnimationDuration,
      }}
      ref={calendarElement}
    >
      {/* <Header
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onMonthSelect={toggleMonthSelector}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isMonthSelectorOpen={mainState.isMonthSelectorOpen}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
        locale={locale}
      /> */}
      <NewHeader />

      {/* <MonthSelector
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      /> */}

      {/* <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      /> */}

      <div className="Calendar__weekDays">{weekdays}</div>

      <DaysList
        activeDate={activeDate}
        value={value}
        monthChangeDirection={mainState.monthChangeDirection}
        onSlideChange={updateDate}
        disabledDays={disabledDays}
        onDisabledDayError={onDisabledDayError}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        calendarTodayClassName={calendarTodayClassName}
        calendarSelectedDayClassName={calendarSelectedDayClassName}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        locale={locale}
        shouldHighlightWeekends={shouldHighlightWeekends}
        isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
      />
    </div>
  );
};

Calendar.defaultProps = {
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'en',
  value: null,
};

Calendar.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape(DAY_SHAPE),
    PropTypes.shape({ from: PropTypes.shape(DAY_SHAPE), to: PropTypes.shape(DAY_SHAPE) }),
    PropTypes.arrayOf(PropTypes.shape(DAY_SHAPE)),
  ]),
  calendarClassName: PropTypes.string,
  colorPrimary: PropTypes.string,
  colorPrimaryLight: PropTypes.string,
  slideAnimationDuration: PropTypes.string,
  minimumDate: PropTypes.shape(DAY_SHAPE),
  maximumDate: PropTypes.shape(DAY_SHAPE),
  locale: PropTypes.oneOf(['en', 'fa']),
};

export { Calendar };
