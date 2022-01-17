export default function getCurrentTime() {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const isPm = hours > 12
  const meridiem = isPm ? 'PM' : 'AM'
  const meridiemHours = isPm ? hours - 12 : hours
  return {
    hours: meridiemHours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    meridiem,
  }
}
