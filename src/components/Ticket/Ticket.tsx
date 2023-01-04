/* eslint-disable no-nested-ternary */
import React from 'react'
import { format, minutesToMilliseconds } from 'date-fns'
import classes from './Ticket.module.sass'

interface TicketProps {
  price: number
  carrier: string
  segments: [
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета туда
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    },
    {
      // Код города (iata)
      origin: string
      // Код города (iata)
      destination: string
      // Дата и время вылета обратно
      date: string
      // Массив кодов (iata) городов с пересадками
      stops: string[]
      // Общее время перелёта в минутах
      duration: number
    }
  ]
}

const Ticket: React.FC<TicketProps> = ({ price, carrier, segments }) => {
  const forward = segments[0]
  const backward = segments[1]

  function getCountTransfer(stops: string[]) {
    return stops.length === 0
      ? 'Без пересадок'
      : stops.length === 1
      ? '1 пересадка'
      : stops.length === 2
      ? '2 пересадки'
      : '3 пересадки'
  }

  function getTimeFromMins(mins: number) {
    const hours = Math.trunc(mins / 60)
    const minutes = mins % 60
    return `${hours}ч ${minutes}м`
  }

  function getTimeStart(date: string) {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
  }

  function getTimeEnd(date: string, mins: number) {
    const timeStart = minutesToMilliseconds(new Date(date).getHours() * 60 + new Date(date).getMinutes() + mins - 180)
    return format(timeStart, 'HH:mm')
  }

  return (
    <div className={classes.ticket}>
      <div className={classes['ticket__info']}>
        <span className={classes['ticket__price']}>
          {`${price}`
            .split('')
            .reverse()
            .map((el, index) => (index % 3 !== 2 ? el : ` ${el}`))
            .reverse()
            .join('')}{' '}
          р
        </span>
        <img
          src={`http://pics.avs.io/99/36/${carrier}.png`}
          alt="Logo Ticket"
        />
      </div>
      <div className={classes['ticket__time']}>
        <div className={classes['ticket__route']}>
          <span className={`${classes['ticket__towns']} ${classes['ticket__up']}`}>
            {forward.origin} – {forward.destination}
          </span>
          <span className={`${classes['ticket__period']} ${classes['ticket__down']}`}>
            {getTimeStart(forward.date)} – {getTimeEnd(forward.date, forward.duration)}
          </span>
        </div>
        <div className={classes['ticket__en-route']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>В пути</span>
          <span className={`${classes['ticket__time-way']} ${classes['ticket__down']}`}>
            {getTimeFromMins(forward.duration)}
          </span>
        </div>
        <div className={classes['ticket__transfer']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>
            {getCountTransfer(forward.stops)}
          </span>
          <span className={`${classes['ticket__town']} ${classes['ticket__down']}`}>{forward.stops.join(', ')}</span>
        </div>
      </div>
      <div className={classes['ticket__time']}>
        <div className={classes['ticket__route']}>
          <span className={`${classes['ticket__towns']} ${classes['ticket__up']}`}>
            {backward.origin} – {backward.destination}
          </span>
          <span className={`${classes['ticket__period']} ${classes['ticket__down']}`}>
            {getTimeStart(backward.date)} – {getTimeEnd(backward.date, backward.duration)}
          </span>
        </div>
        <div className={classes['ticket__en-route']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>В пути</span>
          <span className={`${classes['ticket__time-way']} ${classes['ticket__down']}`}>
            {getTimeFromMins(backward.duration)}
          </span>
        </div>
        <div className={classes['ticket__transfer']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>
            {getCountTransfer(backward.stops)}
          </span>
          <span className={`${classes['ticket__town']} ${classes['ticket__down']}`}>{backward.stops.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

export default Ticket
