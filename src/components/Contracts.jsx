import Contract from './Contract'
import { auth } from '../firebase'
import { useGlobalState } from '../store'
import { useEffect } from 'react'

const Contracts = ({ orders }) => {
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  let ownOrders = []
  let carts = []
  let cartItems = []

  const startRender = () => {
    for (const i in orders) {
      if (isLoggedIn && auth.currentUser.uid === orders[i].uid) {
        ownOrders[i] = orders[i]
      }
    }
    carts = ownOrders.map((item) => item.cart)
    cartItems = carts.flat()
    return true
  }

  useEffect(() => startRender())

  return (
    <div>
      {startRender() ? (
        <div className="flex flex-wrap justify-center items-center space-x-3 space-y-3 mt-12 overflow-x-hidden">
          <div className="flex flex-wrap justify-center items-center space-x-3 space-y-3 mt-12 overflow-x-hidden">
            {cartItems.map((item, i) => (
              <Contract order={item} key={i} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Contracts