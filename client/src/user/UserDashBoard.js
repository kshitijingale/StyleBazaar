import React from 'react'
import Base from '../core/Base'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'

const UserDashboard = () => {

    return (
        isAuthenticated() ? (
            <Base title='This is User dashboard'>
            </Base>
        ) : (
            <Navigate to="/signin" />
        )
    )
}

export default UserDashboard