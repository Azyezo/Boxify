import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Contracts from '../components/Contracts'
import { getOrders } from '../firebase'

const CheckContract = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then((orders) => {
            setOrders(orders)
        })
    }, [])
    return (
        <div className="checkcontract">
            <Header />
            <Contracts orders={orders} />
        </div>
    )
}

export default CheckContract