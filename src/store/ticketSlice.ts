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
  stop: boolean
  error: string | null
  searchId: string | null
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
  const { searchId, stop } = getState().ticket
  if (!stop) {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    if (response.status === 500) {
      dispatch(fetchTicket())
    }
    if (!response.ok) {
      return rejectWithValue('Server Error')
    }
    const data = await response.json()
    dispatch(fetchTicket())
    return data
  }
  return rejectWithValue
})

const initialState: TicketsState = {
  tickets: [],
  loading: null,
  stop: false,
  error: null,
  searchId: null,
}

// const setError = (state, action) => {
//   state.status = 'rejected'
//   state.error = action.payload
// }

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
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
        state.stop = action.payload.stop
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

// export const {} = ticketSlice.actions
export default ticketSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}
