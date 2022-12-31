import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

const promise = loadStripe(
  'pk_test_51MKA0oJaOEG3sp81kzGVG2FIPPoEAEb5ATSO1YL3vtenn6Ila0NEJp996Je5c9gUn75JdrSC3zqWm8er9EGjFawL00QFjh1tHA'
)

function App() {
  
  const [{}, dispatch] = useStateValue()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) =>{
      if (user) {
        dispatch({
          type: 'SET_USER',
          user,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })

  },[dispatch])
  return (
    <Router>  
      <div className="app">    
        <Routes>
          <Route path="/" element={
          <>
            <Header />
            <Home/>
            </>} 
          />
          <Route path="/login" element={
            <><Login/>
            </>}
          />
          <Route path="/checkout" element={
            <><Header /><Checkout />
            </>}
          />
          <Route path="/orders" element={
            <><Header /><Orders />
            </>}
          />
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>    
            </>}
          />
        </Routes> 
      </div>
    </Router>
    
  );
}

export default App;
