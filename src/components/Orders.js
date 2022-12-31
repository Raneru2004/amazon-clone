import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'
import Order from './Order'
import './Orders.css'

export default function Orders() {
    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        async function getOrders(){
            if(user){
                const {docs} = await getDocs(collection(db, 'users', user?.uid, 'orders'))
                const orders = docs.map(doc=> ({id : doc.id, data:doc.data()}))
                setOrders(orders)
            } else {
                setOrders([])
            }  
        }
        getOrders();
    },[user])
  return (
    <div className='orders'>
        <h1>Your Orders</h1>

        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}
