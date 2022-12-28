import React, { useEffect } from 'react'
import classes from './App.module.sass'
import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchSearchId, fetchTicket } from '../../store/ticketSlice'
import FilterTransplants from '../FilterTransplants/FilterTransplants'
import Filter from '../Filter/Filter'
import Ticket from '../Ticket/Ticket'
import Logo from '../Logo/Logo'

function App() {
  const dispatch = useAppDispatch()
  const { searchId } = useAppSelector((state) => state.ticket)

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
          <Ticket></Ticket>
        </div>
      </div>
    </>
  )
}

export default App
