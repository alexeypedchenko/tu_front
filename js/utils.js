export const getObjectByKey = (arr, key, val) => {
  const index = arr.findIndex((item) => item[key] === val)
  return index !== -1 ? arr[index] : null
}
