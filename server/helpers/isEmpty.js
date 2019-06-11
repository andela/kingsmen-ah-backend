/**
 * Function to check if value is empty
 * @param {string} value
 * @return {(error|bool)} returns error or true
 */
const isEmpty = value => (
  value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0)
);

export default isEmpty;
