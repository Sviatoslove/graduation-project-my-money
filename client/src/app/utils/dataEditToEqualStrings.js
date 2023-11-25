export const dataEditToEqualStrings = (data, num) => {
  if (data) {
    const array = Object.values(data);
    const rate =
      Math.ceil(array.length / 2) > num ? num : Math.ceil(array.length / 2);
    return array.reduce((acc, count, idx, array) => {
      const arr = array.splice(0, rate);
      acc.push(arr);
      return acc;
    }, []);
  }
};
