import { useAppSelector } from '../../hook'
import Ticket from '../Ticket/Ticket'
import ShowMore from '../ShowMore/ShowMore'
import { getFilterTicket } from '../../utils/getFilterTickets'

const TicketList: React.FC = () => {
  const { tickets, showMoreCount, all, nonStop, transplant1, transplant2, transplant3 } = useAppSelector(
    (state) => state.ticket
  )
  const getCheckAllOff = !all && !nonStop && !transplant1 && !transplant2 && !transplant3

  return (
    <>
      {getCheckAllOff ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          Билетов не найдено!
        </div>
      ) : (
        getFilterTicket(tickets, all, nonStop, transplant1, transplant2, transplant3)
          .slice(0, showMoreCount)
          .map((item, index) => {
            const { ...allProps } = item
            return (
              <Ticket
                key={index}
                {...allProps}></Ticket>
            )
          })
      )}
      {getFilterTicket(tickets, all, nonStop, transplant1, transplant2, transplant3).length >= 5 && (
        <ShowMore></ShowMore>
      )}
    </>
  )
}

export default TicketList
