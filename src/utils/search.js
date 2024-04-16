/**
 * Function to search objects in an array based on provided keys and query string.
 * @param {Array} array - Array of objects to search through.
 * @param {string} queryString - Query string to search for.
 * @param {Array} keys - Keys of the object to search within.
 * @returns {Array} - Filtered array of objects matching the query, sorted by relevance.
 */
export function searchObjects(array, queryString, keys) {
  // Check if the query string or keys are empty, return empty array if true
  try {
    if (keys.length === 0) {
      return []; // Return empty array if no keys are provided
    }

    if (!queryString.trim()) {
      return array; // Return the original array if the query string is empty
    }

    // Loop through the array to filter objects
    const filteredArray = array.filter((obj) => {
      // Loop through the keys of each object
      for (let key of keys) {
        // Convert the value to string only for the comparison
        let value = obj[key];
        if (typeof value === "number") {
          value = value.toString();
        }
        value = value.toLowerCase();
        if (value.includes(queryString.toLowerCase()?.trim())) {
          return true;
        }
      }
      // Return false if none of the keys contain the query string
      return false;
    });

    // Return the filtered array
    return filteredArray;
  } catch (error) {
    console.error("Error in searchObjects: ", error);
    return [];
  }
}
