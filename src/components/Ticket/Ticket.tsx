import React from 'react'
import classes from './Ticket.module.sass'
import LogoTicket from '../../images/S7Logo.png'

export default function Ticket() {
  return (
    <div className={classes.ticket}>
      <div className={classes['ticket__info']}>
        <span className={classes['ticket__price']}>13 400 р</span>
        <img
          src={LogoTicket}
          alt="Logo Ticket"
        />
      </div>
      <div className={classes['ticket__time']}>
        <div className={classes['ticket__route']}>
          <span className={`${classes['ticket__towns']} ${classes['ticket__up']}`}>MOW – HKT</span>
          <span className={`${classes['ticket__period']} ${classes['ticket__down']}`}>10:45 – 08:00</span>
        </div>
        <div className={classes['ticket__en-route']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>В пути</span>
          <span className={`${classes['ticket__time-way']} ${classes['ticket__down']}`}>21ч 15м</span>
        </div>
        <div className={classes['ticket__transfer']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>2 пересадки</span>
          <span className={`${classes['ticket__town']} ${classes['ticket__down']}`}>HKG, JNB</span>
        </div>
      </div>
      <div className={classes['ticket__time']}>
        <div className={classes['ticket__route']}>
          <span className={`${classes['ticket__towns']} ${classes['ticket__up']}`}>MOW – HKT</span>
          <span className={`${classes['ticket__period']} ${classes['ticket__down']}`}>10:45 – 08:00</span>
        </div>
        <div className={classes['ticket__en-route']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>В пути</span>
          <span className={`${classes['ticket__time-way']} ${classes['ticket__down']}`}>21ч 15м</span>
        </div>
        <div className={classes['ticket__transfer']}>
          <span className={`${classes['ticket__way']} ${classes['ticket__up']}`}>2 пересадки</span>
          <span className={`${classes['ticket__town']} ${classes['ticket__down']}`}>HKG, JNB</span>
        </div>
      </div>
    </div>
  )
}
