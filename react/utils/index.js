export const startLoading = () => {
  window.postMessage({ action: { type: 'START_LOADING' } }, '*')
}

export const stopLoading = () => {
  window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
}
