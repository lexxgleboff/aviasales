import React from 'react'
import classes from './Filter.module.sass'

export default function FilterButton() {
  return (
    <div className={classes['filter']}>
      <label className={classes['filter__label']}>
        <input
          id="radio-1"
          type="radio"
          name="radio"
          value="Самый дешевый"
          className={classes['filter__input']}
          defaultChecked
        />
        <span className={`${classes['filter__name']} ${classes['first-name']}`}>CАМЫЙ ДЕШЕВЫЙ</span>
      </label>
      <label className={classes['filter__label']}>
        <input
          id="radio-2"
          type="radio"
          name="radio"
          className={classes['filter__input']}
          value="Самый быстрый"
        />
        <span className={`${classes['filter__name']} ${classes['centred-name']}`}>CАМЫЙ БЫСТРЫЙ</span>
      </label>
      <label className={classes['filter__label']}>
        <input
          id="radio-3"
          type="radio"
          name="radio"
          className={classes['filter__input']}
          value="Оптимальный"
        />
        <span className={`${classes['filter__name']} ${classes['last-name']}`}>ОПТИМАЛЬНЫЙ</span>
      </label>
    </div>
  )
}
