export const reversed = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  return [...arr].reverse();
};
