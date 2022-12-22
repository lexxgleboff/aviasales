import React from 'react'
import './Ticket.sass'
import LogoTicket from '../../images/S7Logo.png'

export default function Ticket() {
  return (
    <div className="ticket">
      <div className="ticket__info">
        <span className="ticket__price">13 400 р</span>
        <img
          src={LogoTicket}
          alt="Logo Ticket"
        />
      </div>
      <div className="ticket__time">
        <div className="ticket__route">
          <span className="ticket__towns ticket__up">MOW – HKT</span>
          <span className="ticket__period ticket__down">10:45 – 08:00</span>
        </div>
        <div className="ticket__en-route">
          <span className="ticket__way ticket__up">В пути</span>
          <span className="ticket__time-way ticket__down">21ч 15м</span>
        </div>
        <div className="ticket__transfer">
          <span className="ticket__way ticket__up">2 пересадки</span>
          <span className="ticket__town ticket__down">HKG, JNB</span>
        </div>
      </div>
      <div className="ticket__time">
        <div className="ticket__route">
          <span className="ticket__towns ticket__up">MOW – HKT</span>
          <span className="ticket__period ticket__down">10:45 – 08:00</span>
        </div>
        <div className="ticket__en-route">
          <span className="ticket__way ticket__up">В пути</span>
          <span className="ticket__time-way ticket__down">21ч 15м</span>
        </div>
        <div className="ticket__transfer">
          <span className="ticket__way ticket__up">2 пересадки</span>
          <span className="ticket__town ticket__down">HKG, JNB</span>
        </div>
      </div>
    </div>
  )
}
