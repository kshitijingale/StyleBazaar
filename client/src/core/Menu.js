import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'

// const currentTab = (history, path) => {
//     console.log(history);
//     if (history.location.pathname === path) {
//         return { color: "#2ecc72" }
//     } else {
//         return { color: "#ffffff" }
//     }
// }

const Menu = () => {
    const navigate = useNavigate()
    return (
        <div>
            <ul className='nav nav-tabs bg-dark'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/cart">Cart</Link>
                </li>

                {isAuthenticated() && isAuthenticated().userInfo.role === "USER" && (
                    <li className='nav-item'>
                        <Link className='nav-link' to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" && (
                    <li className='nav-item'>
                        <Link className='nav-link' to="/admin/dashboard">A. Dashboard</Link>
                    </li>
                )}
                {
                    !isAuthenticated() && (<>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/signup">Sign Up</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/signin">Sign In</Link>
                        </li>
                    </>)
                }
                {
                    isAuthenticated() && (
                        <li className='nav-item'>
                            <span className='nav-link' onClick={() => {
                                signout(() => {
                                    navigate("/")
                                })
                            }}>Signout</span>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Menu
