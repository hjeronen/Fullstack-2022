import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {dispatch(notify(notification))}
    </div>
  )
}

export default Notification