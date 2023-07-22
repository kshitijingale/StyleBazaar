import React from 'react'
import Menu from './Menu'

const Base = ({
    title = "My Title",
    description = "My Description",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu />
            <div className='container-fluid'>
                <div className='jumbotron bg-dark text-white text-center'>
                    <h1 className='display-4'>{title}</h1>
                    <p className='lead'>{description}</p>
                </div>
                <div className={className} > {children}</div>
            </div>
            <footer className='bg-dark mt-auto footer py3'>
                <div className='container-fluid bg-success text-white text-center'>
                    <h4>If you have any questions, feel free to reach out!</h4>
                    <button className='btn btn-warning btn-lg'>Contact us</button>
                </div>
            </footer>
        </div>
    )
}

export default Base
