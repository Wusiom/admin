export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
export const clear = () => {
  window.localStorage.clear()
}
