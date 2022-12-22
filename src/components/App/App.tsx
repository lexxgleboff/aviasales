import React from 'react'
import FilterTransplants from '../FilterTransplants/FilterTransplants'
import FilterButton from '../FilterButton/FilterButton'
import Ticket from '../Ticket/Ticket'
import './App.sass'
import Logo from '../Logo/Logo'

function App() {
  return (
    <>
      <Logo></Logo>
      <div className="container">
        <FilterTransplants></FilterTransplants>
        <div className="wrapper">
          <FilterButton></FilterButton>
          <Ticket></Ticket>
        </div>
      </div>
    </>
  )
}

export default App
