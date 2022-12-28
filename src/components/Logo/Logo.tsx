import React from 'react'
import classes from './Logo.module.sass'
import logo from '../../images/Logo.png'

export default function Logo() {
  return (
    <div className={classes.logo}>
      <img
        src={logo}
        alt="logo"
      />
    </div>
  )
}
