import React from 'react';
import NumberFormat from 'react-number-format';

export const numberWithCommas = (x) => {
  //   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return (
    <NumberFormat
      value={x}
      displayType="text"
      thousandSeparator={true}
    />
  );
};

export const colors = {
  light: {
    primary: '#000',
  },
  dark: {
    primary: '#eee',
  },
};

// module.exports = {
//   numberWithCommas,
// };
