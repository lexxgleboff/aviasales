/* eslint-disable consistent-return */
import React from 'react'
import { useAppSelector } from '../../hook'
import Ticket from '../Ticket/Ticket'
import ShowMore from '../ShowMore/ShowMore'

const TicketList: React.FC = () => {
  const { tickets, showMoreCount, all, nonStop, transplant1, transplant2, transplant3 } = useAppSelector(
    (state) => state.ticket
  )

  const filterTicket = () => {
    return tickets.filter((ticket) => {
      if (all) return ticket
      if (nonStop && (!ticket.segments[0].stops.length || !ticket.segments[1].stops.length)) return true
      if (transplant1 && (ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1)) return true
      if (transplant2 && (ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2)) return true
      if (transplant3 && (ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3)) return true
      return false
    })
  }

  return (
    <>
      {!all && !nonStop && !transplant1 && !transplant2 && !transplant3 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          Билетов не найдено!
        </div>
      ) : (
        filterTicket()
          ?.slice(0, showMoreCount)
          .map((item, index) => {
            const { ...allProps } = item
            return (
              <Ticket
                key={index}
                {...allProps}></Ticket>
            )
          })
      )}
      {filterTicket().length >= 5 && <ShowMore></ShowMore>}
    </>
  )
}

export default TicketList
