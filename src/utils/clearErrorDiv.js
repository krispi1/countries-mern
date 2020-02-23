/**
  * clearErrorDiv is a helper function that clears the 
  * errorDiv below after duration(seconds) has elapsed.
  * It's called by searchCountry in case the search key 
  * supplied to the search field did not match the 
  * characters contained in any country name. 
  * 
  * @param {*} duration
  * @returns undefined
  */
function clearErrorDiv(duration, divId) {
  if (
    document.getElementById(String(divId)).textContent !== ""
  ) {
    const timer = setInterval(() => {
      duration -= 1;
      if (duration ===0) {
        document.getElementById(String(divId)).textContent = ""
        clearInterval(timer);
        return;
      }
    }, 1000);
  }
} // clearErrorDiv

export default clearErrorDiv;
