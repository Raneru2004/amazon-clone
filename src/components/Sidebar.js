import React from 'react';
import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';


//I used an online tutorial to learn how to use react-burger-menu

export default props => {
  const [{basket, user}, dispatch] = useStateValue()
    const handleAuthentication = () => {
        if (user) {
            auth.signOut()    
        }
    }
  return (
    <div className='sidebar' data-testid="sidebar">
      <Menu>
        <Link className="menu-item" to="/">
          Home
        </Link>

        <Link className="menu-item " to="/orders">
          Returns & Orders
        </Link>

        <Link className="menu-item no-cursor" to="/">
          Your Prime
        </Link>

        <Link className="menu-item" to="/checkout">
          Cart
        </Link>

        <Link className="menu-item" to="/login">
          {user ? 'Sign Out' : 'Sign In'}
        </Link>
      </Menu>
    </div>
  );
};
