/**
 * Function to check if input contains forbidden characters
 * @param {string} input - The input string to validate
 * @returns {boolean} - Returns true if forbidden characters are found, otherwise false
 */
const sanitizeInput = (input) => {
    // Regex to match single quote ('), double quote ("), greater than (>), less than (<), and backtick (`)
    const forbiddenCharacters = /['"<>`]/;
    return forbiddenCharacters.test(input);
  };
  
  module.exports = sanitizeInput;
  