export const debounce = (func, wait) => {
  let timer = null
  return function (this, ...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait);
  }
}
