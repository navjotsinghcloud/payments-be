import { maxBy } from 'lodash';

// from an array of objects returns the maximum value of some jey
export const getMaximumIndexByKey = (arr, key) => {
  return maxBy(arr || [], key)[key];
};

// this pads zeros before any number string
//  for eg. 1 will become 001
export const padZeros = (val, length = 3) => {
  return val.padStart(length, '0');
};
