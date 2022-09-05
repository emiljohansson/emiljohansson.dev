export function scaleGame (gameEl: HTMLElement) {
  const visibleHeight = gameEl.offsetHeight
  const fullHeight = gameEl.scrollHeight
  if (fullHeight <= visibleHeight) return
  const newWidth = (gameEl.offsetWidth - 32) * (visibleHeight / fullHeight)
  gameEl.style.width = `${newWidth}px`
}
