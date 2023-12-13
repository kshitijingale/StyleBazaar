import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'
import logo from '../assets/images/logo1.png'


const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate()
    return (
        <nav className="bg-[#fff] py-3 px-4 fixed top-0 left-0 right-0 z-10 shadow-lg">
            <div className="flex items-center justify-between max-w-[1560px] mx-auto">
                <div className={`flex items-center ${isOpen ? 'self-start' : ''} `}>
                    <Link className='text-[#000] hover:text-gray-300' to="/">
                        <img src={logo} alt="Logo" className="h-7 md:h-[40px] mr-2" />
                    </Link>
                </div>

                <div className='flex flex-col-reverse lg:flex-row gap-3 lg:gap-10'>
                    <ul className={`lg:flex ${isOpen ? 'flex flex-col gap-2' : 'hidden'} justify-center gap-10`}>
                        <li>
                            <Link className='text-[#000] hover:text-gray-300' to="/">Categories</Link>
                        </li>
                        {isAuthenticated() && isAuthenticated().userInfo.role === "USER" && (
                            <li className='nav-item'>
                                <Link className='text-[#000] hover:text-gray-300' to="/user/dashboard">Dashboard</Link>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().userInfo.role === "ADMIN" && (
                            <li className='nav-item'>
                                <Link className='text-[#000] hover:text-gray-300' to="/admin/dashboard">Admin Panel</Link>
                            </li>
                        )}
                        <li>
                            <a href="#" className="text-[#000] hover:text-gray-300">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-[#000] hover:text-gray-300">Developer</a>
                        </li>
                        {
                            !isAuthenticated() && (<>
                                <li>
                                    <Link className='nav-link' to="/signin">
                                        <button className="text-[#000] hover:text-gray-300 ">Sign In</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link className='nav-link' to="/signup">
                                        <button className="text-[#000] hover:text-gray-300">
                                            Sign Up
                                        </button>
                                    </Link>
                                </li>
                            </>)
                        }
                        {
                            isAuthenticated() && (
                                <li>
                                    <button className='text-[#000] hover:text-gray-300' onClick={() => {
                                        signout(() => {
                                            navigate("/")
                                        })
                                    }}>Signout</button>
                                </li>
                            )
                        }
                    </ul>
                    <div className='flex gap-4 justify-end'>
                        <div className="lg:hidden">
                            <button
                                onClick={toggleNavbar}
                                className="text-black focus:outline-none"
                            >
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-[22px] w-[22px] fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M19.707 4.293a1 1 0 011.414 1.414L13.414 12l7.707 7.293a1 1 0 11-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 11-1.414-1.414L10.586 12 3.293 4.707a1 1 0 111.414-1.414L12 10.586l7.293-7.293z"
                                        />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_429_11066)">
                                            <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_429_11066">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )
                                }
                            </button>
                        </div>
                        <button className={`relative group self-start md:self-center `}>
                            <Link to="/cart">
                                <i className="text-[20px] fas fa-shopping-cart text-gray-800 group-hover:text-gray-500"></i>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </nav >

    )
}

export default Menu
