import classes from './ShowMore.module.sass'
import { showMore } from '../../store/ticketSlice'
import { useAppDispatch } from '../../hook'

const ShowMore: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      className={classes['showmore']}
      onClick={() => dispatch(showMore())}>
      Показать еще 5 билетов!
    </button>
  )
}

export default ShowMore
