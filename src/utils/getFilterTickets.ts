type Ticket = {
  // Цена в рублях
  price: number
  // Код авиакомпании (iata)
  carrier: string
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
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

export const getFilterTicket = (
  tickets: Ticket[],
  all: boolean,
  nonStop: boolean,
  transplant1: boolean,
  transplant2: boolean,
  transplant3: boolean
) => {
  return tickets.filter((ticket: { segments: { stops: string[] }[] }) => {
    if (all) return ticket
    if (nonStop && (!ticket.segments[0].stops.length || !ticket.segments[1].stops.length)) return true
    if (transplant1 && (ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1)) return true
    if (transplant2 && (ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2)) return true
    if (transplant3 && (ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3)) return true
    return false
  })
}
