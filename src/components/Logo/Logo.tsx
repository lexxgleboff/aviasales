import classes from './Logo.module.sass'
import logo from '../../assets/Logo.png'

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
