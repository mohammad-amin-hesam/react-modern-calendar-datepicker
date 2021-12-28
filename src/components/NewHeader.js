import React from 'react';

const NewHeader = () => {
  return (
    <header className="Calendar__newheader">
      <h3>انتخاب تاریخ سفر</h3>
      <p>از ۲۲ آبان تا ۲۴ آبان</p>

      <button type="button">
        <span className="Calendar__monthArrow" />
      </button>
    </header>
  );
};

export default NewHeader;
