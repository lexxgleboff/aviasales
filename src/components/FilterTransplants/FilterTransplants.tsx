import React from 'react'
import classes from './FilterTransplants.module.sass'
import { useAppSelector, useAppDispatch } from '../../hook'
import {
  allChecked,
  nonTransplants,
  changeTransplant1,
  changeTransplant2,
  changeTransplant3,
} from '../../store/ticketSlice'

export default function FilterTransplants() {
  const dispatch = useAppDispatch()
  const { all, nonStop, transplant1, transplant2, transplant3 } = useAppSelector((state) => state.ticket)
  return (
    <div className={classes.transplants}>
      <span className={classes['transplants__title']}>количество пересадок</span>
      <label className={classes['transplants__label']}>
        <input
          type="checkbox"
          id="all"
          name="all"
          checked={all}
          onChange={() => dispatch(allChecked(!all))}
        />
        <span>Все</span>
      </label>
      <label className={classes['transplants__label']}>
        <input
          type="checkbox"
          id="non-stop"
          name="non-stop"
          checked={nonStop}
          onChange={() => dispatch(nonTransplants(!nonStop))}
        />
        <span>Без пересадок</span>
      </label>
      <label className={classes['transplants__label']}>
        <input
          type="checkbox"
          id="transplant1"
          name="transplant1"
          checked={transplant1}
          onChange={() => dispatch(changeTransplant1(!transplant1))}
        />
        <span>1 пересадка</span>
      </label>
      <label className={classes['transplants__label']}>
        <input
          type="checkbox"
          id="transplant2"
          name="transplant2"
          checked={transplant2}
          onChange={() => dispatch(changeTransplant2(!transplant2))}
        />
        <span>2 пересадка</span>
      </label>
      <label className={classes['transplants__label']}>
        <input
          type="checkbox"
          id="transplant3"
          name="transplant3"
          checked={transplant3}
          onChange={() => dispatch(changeTransplant3(!transplant3))}
        />
        <span>3 пересадки</span>
      </label>
    </div>
  )
}
