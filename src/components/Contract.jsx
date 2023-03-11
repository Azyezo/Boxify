import React from 'react'
import Card from '@material-tailwind/react/Card'
import CardImage from '@material-tailwind/react/CardImage'
import CardBody from '@material-tailwind/react/CardBody'
import CardFooter from '@material-tailwind/react/CardFooter'
import H6 from '@material-tailwind/react/Heading6'
import Paragraph from '@material-tailwind/react/Paragraph'
import Button from '@material-tailwind/react/Button'
import Popup from 'reactjs-popup'
import './Popup.css'
import { useEffect } from 'react'

const Contract = ({ order }) => {

  const startRender = () => {
    return true
  }

  const checkSubscription = () => {
    let time = order.timestamp
    let date = time.toDate()
    date.setDate(date.getDate() + order.months * 30)

    //window.alert(`Your contract expires on ${date}`)
    return (`Your contract expires on ${date}`)
  }

  useEffect(() => startRender())

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  return (
    <div>
      {startRender() ? (
        <div className="mx-4 my-6 w-64">
          <Card>
            <CardImage src={order.imgURL} alt={order.name} />

            <CardBody>
              <H6 color="gray">{order.name}</H6>

              <Paragraph color="gray">
                {order.description}
              </Paragraph>

              <div
                color="black"
                className="flex flex-row justify-between orders-center"
              >
                <span className="font-semibold text-red-500">
                  {toCurrency(order.price)}
                </span>
                <span className="text-xs text-red-500">{order.months} months</span>
              </div>
            </CardBody>

            <CardFooter>

              <Popup trigger=
                {
                  <Button
                    className="date"
                    id="checkContract"
                    color="red"
                    size="md"
                    ripple="light"
                  >
                    Check Contract
                  </Button>
                }
                modal
              >
                <div className='popup-content'>
                  {checkSubscription()}
                </div>
              </Popup>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </div>
  )
}


export default Contract