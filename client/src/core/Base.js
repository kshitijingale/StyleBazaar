import React from 'react'
import Menu from './Menu'
import Footer from './Footer'

const Base = ({
    className = "bg-[#fff] text-[#000]",
    children
}) => {
    return (
        <div className='max-w-[1560px] mx-auto overflow-x-hidden'>
            <Menu />

            <div className={className} > {children}</div>



            <Footer />
        </div>
    )
}

export default Base
