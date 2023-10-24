// Function to check if a given value is empty or not
const isEmpty = (value) => {
  // Check if the value is undefined, null, an empty object, or a string with only whitespace
    // If any of these conditions are true, the value is considered empty
   
    value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0);
};
  
export {isEmpty}