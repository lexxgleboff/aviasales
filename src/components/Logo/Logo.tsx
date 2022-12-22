import React from 'react'
import logo from '../../images/Logo.png'
import './logo.sass'

export default function Logo() {
  return (
    <div className="logo">
      <img
        src={logo}
        alt="logo"
      />
    </div>
  )
}
