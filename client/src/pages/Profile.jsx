import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { useDashboardContext } from './Dashboard'

const Profile = () => {


    return (
        <Outlet />
    )
}

export default Profile