import React, { useEffect } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import classes from './App.module.sass'
import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchSearchId, fetchTicket } from '../../store/ticketSlice'
import FilterTransplants from '../FilterTransplants/FilterTransplants'
import Filter from '../Filter/Filter'
import Logo from '../Logo/Logo'
import TicketList from '../TicketList/TicketList'

function App() {
  const dispatch = useAppDispatch()
  const { searchId, loading } = useAppSelector((state) => state.ticket)
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [])

  useEffect(() => {
    if (searchId) dispatch(fetchTicket())
  }, [searchId])

  return (
    <>
      <Logo></Logo>
      <div className={classes.container}>
        <FilterTransplants></FilterTransplants>
        <div>
          <Filter></Filter>
          {loading ? (
            <div className={classes.loading}>
              <InfinitySpin color="#2196F3"></InfinitySpin>
            </div>
          ) : (
            <TicketList></TicketList>
          )}
        </div>
      </div>
    </>
  )
}

export default App
