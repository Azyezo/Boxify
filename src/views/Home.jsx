import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Boxs from '../components/Boxs'
import { getProducts } from '../firebase'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((products) => {
      products.filter((item) => {
        item.price = Number(item.price)
        item.qty = 0
      })
      setProducts(products)
    })
  }, [])
//list all avalible products
  return (
    <div className="home">
      <Header />
      <Boxs products={products} />
    </div>
  )
}

export default Home
