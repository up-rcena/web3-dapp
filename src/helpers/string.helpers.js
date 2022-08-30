/**
 *  Returns a string of form 'abc...xyz
 * @param {string} str
 * @param {number} n number of chars to keep at frontend
 * @returns {string|string}
 */
export const getEllipsisText = (str, n = 6) => str ? `${str.slice(0, n)}...${str.slice(str.length - n)}` : ''

/**
 *
 * @param value
 * @param decimals
 * @returns {number|*}
 */
export const tokenValue = (value, decimals) => decimals ? value / Math.pow(10, decimals) : value
