import React from 'react'
import { Link } from 'react-router-dom'

// const currentTab = (history, path) => {
//     console.log(history);
//     if (history.location.pathname === path) {
//         return { color: "#2ecc72" }
//     } else {
//         return { color: "#ffffff" }
//     }
// }

const Menu = () => {
    return (
        <div>
            <ul className='nav nav-tabs bg-dark'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/cart">Cart</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/user/dashboard">Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/dashboard">A. Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/signup">Sign Up</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/signin">Sign In</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/signout">Signout</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
