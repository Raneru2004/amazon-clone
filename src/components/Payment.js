import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../reducer'
import axios from '../axios'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function Payment() {
    const [{basket, user}, dispatch] = useStateValue()
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [suceeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(true)

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    useEffect(() => {
        // generate special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            })
            console.log(response)

            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    

    const handleSubmit = async (event) => {
        //do all the fancy stripe stuff
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment info

            const order = {
                basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            }

            addDoc(collection(db, 'users', user?.uid, 'orders'), order)

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders')
        })
    }

    const handleChange = (event) => {
        // listen for changes in CardElement
        // and display any errors as the customer types their card details

        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }
    console.log('secret is ', clientSecret)

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                <h3>Order total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || suceeded}>
                                <span>{processing ? 
                                    <p>Processing</p> :
                                    <p>Buy Now</p>
                                }</span>
                            </button>
                        </div>
                        {/* Errors */ }
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
