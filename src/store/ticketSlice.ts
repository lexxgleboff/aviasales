/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit'

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

type TicketsState = {
  tickets: Ticket[]
  loading: boolean | null
  error: string | null
  searchId: string | null
  showMoreCount: number
  radioValue: string | null
  all: boolean
  nonStop: boolean
  transplant1: boolean
  transplant2: boolean
  transplant3: boolean
}

export const fetchSearchId = createAsyncThunk<string>('ticket/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data.searchId
})

export const fetchTicket = createAsyncThunk<
  TicketsState,
  undefined,
  { rejectValue: string; state: { ticket: TicketsState } }
>('ticket/fetchTicket', async (_, { getState, rejectWithValue, dispatch }) => {
  const { searchId } = getState().ticket
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (response.status === 500) {
    dispatch(fetchTicket())
  }
  const data = await response.json()
  const { stop } = data
  if (!response.ok) {
    return rejectWithValue('Server Error')
  }
  if (!stop) {
    dispatch(fetchTicket())
  }
  return data
})

const initialState: TicketsState = {
  tickets: [],
  loading: null,
  error: null,
  searchId: null,
  showMoreCount: 5,
  radioValue: null,
  all: true,
  nonStop: true,
  transplant1: true,
  transplant2: true,
  transplant3: true,
}

// const setError = (state, action) => {
//   state.status = 'rejected'
//   state.error = action.payload
// }

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    showMore(state) {
      state.showMoreCount += 5
    },
    minPrice(state, action) {
      state.radioValue = action.payload
      state.tickets.sort((ticket1: Ticket, ticket2: Ticket) => (ticket1['price'] > ticket2['price'] ? 1 : -1))
    },
    fastTicket(state, action) {
      state.radioValue = action.payload
      state.tickets.sort((ticket1: Ticket, ticket2: Ticket) =>
        ticket1.segments[0]['duration'] + ticket1.segments[1]['duration'] >
        ticket2.segments[0]['duration'] + ticket2.segments[1]['duration']
          ? 1
          : -1
      )
    },
    optimal(state, action) {
      state.radioValue = action.payload
      state.tickets
        .sort(
          (ticket1: Ticket, ticket2: Ticket) =>
            ticket1.segments[0].duration +
            ticket1.segments[1].duration -
            (ticket2.segments[0].duration + ticket2.segments[1].duration)
        )
        .sort((ticket1: Ticket, ticket2: Ticket) => ticket1['price'] - ticket2['price'])
    },
    allChecked(state, action) {
      state.all = action.payload
      if (state.all) {
        state.nonStop = true
        state.transplant1 = true
        state.transplant2 = true
        state.transplant3 = true
      } else {
        state.nonStop = false
        state.transplant1 = false
        state.transplant2 = false
        state.transplant3 = false
      }
    },
    nonTransplants(state, action) {
      state.nonStop = action.payload
      if (!state.nonStop) state.all = false
      if (state.nonStop && state.transplant1 && state.transplant2 && state.transplant3) state.all = true
    },
    changeTransplant1(state, action) {
      state.transplant1 = action.payload
      if (!state.transplant1) state.all = false
      if (state.nonStop && state.transplant1 && state.transplant2 && state.transplant3) state.all = true
    },
    changeTransplant2(state, action) {
      state.transplant2 = action.payload
      if (!state.transplant2) state.all = false
      if (state.nonStop && state.transplant1 && state.transplant2 && state.transplant3) state.all = true
    },
    changeTransplant3(state, action) {
      state.transplant3 = action.payload
      if (!state.transplant3) state.all = false
      if (state.nonStop && state.transplant1 && state.transplant2 && state.transplant3) state.all = true
    },
  },
  // extraReducers: {
  //   [fetchSearchId.pending]: (state) => {
  //     state.status = 'loading'
  //     state.error = null
  //   },
  //   [fetchSearchId.fulfilled]: (state, action) => {
  //     state.status = 'resolved'
  //     state.searchId = action.payload.searchId
  //   },
  //   [fetchSearchId.rejected]: setError,
  //   [fetchTicket.pending]: (state) => {
  //     state.status = 'loading'
  //     state.error = null
  //   },
  //   [fetchTicket.fulfilled]: (state, action) => {
  //     state.status = 'resolved'
  //     state.tickets = action.payload
  //   },
  //   [fetchTicket.rejected]: setError,
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload
      })
      .addCase(fetchTicket.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        state.loading = false
        state.tickets.push(...action.payload.tickets)
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const {
  showMore,
  minPrice,
  fastTicket,
  optimal,
  allChecked,
  nonTransplants,
  changeTransplant1,
  changeTransplant2,
  changeTransplant3,
} = ticketSlice.actions
export default ticketSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}
