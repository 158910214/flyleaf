export const useGetDom = (dom: string | Element) => typeof dom === 'string'
  ? document.querySelector(dom)
  : dom