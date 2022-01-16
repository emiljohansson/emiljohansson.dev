export default function getCurrentTime () {
  const date: Date = new Date()
  const hours: number = date.getHours()
  const minutes: number = date.getMinutes()
  const isPm: boolean = hours > 12
  const meridiem: string = isPm
    ? 'PM'
    : 'AM'
  const meridiemHours: number = isPm
    ? hours - 12
    : hours
  return {
    hours: meridiemHours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    meridiem,
  }
}
