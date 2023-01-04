/* eslint-disable no-nested-ternary */
export function getCountTransfer(stops: string[]) {
  return stops.length === 0
    ? 'Без пересадок'
    : stops.length === 1
    ? '1 пересадка'
    : stops.length === 2
    ? '2 пересадки'
    : '3 пересадки'
}
