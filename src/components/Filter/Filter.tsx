import classes from './Filter.module.sass'
import { useAppSelector, useAppDispatch } from '../../hook'
import { minPrice, fastTicket, optimal } from '../../store/ticketSlice'

export default function FilterButton() {
  const dispatch = useAppDispatch()
  const radioValue = useAppSelector((state) => state.ticket.radioValue)
  return (
    <div className={classes['filter']}>
      <label className={classes['filter__label']}>
        <input
          id="radio-1"
          type="radio"
          name="radio"
          className={classes['filter__input']}
          checked={radioValue === 'Самый дешевый'}
          onChange={() => dispatch(minPrice('Самый дешевый'))}
        />
        <span className={`${classes['filter__name']} ${classes['first-name']}`}>CАМЫЙ ДЕШЕВЫЙ</span>
      </label>
      <label className={classes['filter__label']}>
        <input
          id="radio-2"
          type="radio"
          name="radio"
          className={classes['filter__input']}
          checked={radioValue === 'Самый быстрый'}
          onChange={() => dispatch(fastTicket('Самый быстрый'))}
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
          checked={radioValue === 'Оптимальный'}
          onChange={() => dispatch(optimal('Оптимальный'))}
        />
        <span className={`${classes['filter__name']} ${classes['last-name']}`}>ОПТИМАЛЬНЫЙ</span>
      </label>
    </div>
  )
}
