import { format, minutesToMilliseconds } from 'date-fns'

export function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60)
  const minutes = mins % 60
  return `${hours}ч ${minutes}м`
}

export function getTimeStart(date: string) {
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
}

export function getTimeEnd(date: string, mins: number) {
  const timeStart = minutesToMilliseconds(new Date(date).getHours() * 60 + new Date(date).getMinutes() + mins - 180)
  return format(timeStart, 'HH:mm')
}
