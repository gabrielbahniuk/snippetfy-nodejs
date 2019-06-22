module.exports = {
  validateData(arr) {
    for (let i = 0; i < arr.length; i++) {
      switch (typeof arr[i]) {
        case 'string':
          return (
            arr[i] &&
            arr[i].trim() != '' &&
            arr[i] !== null &&
            arr[i] !== 'undefined'
          );
        default:
          return false;
      }
    }
  }
};
