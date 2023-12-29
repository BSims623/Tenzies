import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const DeleteProfile = () => {
    const navigate = useNavigate();


    const handleDeleteUser = async () => {
        try {
            await customFetch.delete('/users/delete-user')
            navigate('/')
            toast.success('successfully deleted profile')
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg)
            return null
        }

    }
    return (
        <div className="container-fluid bg-dark">
            <div style={{ maxWidth: '700px' }} className="areYouSure bg-dark vh-100 container-sm d-flex flex-column justify-content-center">
                <h2 className="text-light text-center">Are you sure you want to delete your profile?</h2>
                <div className="buttonContainer mt-4 d-flex flex-column justify-content-center">
                    <button className="btn btn-danger mb-3" onClick={() => handleDeleteUser()}>Yes</button>
                    <Link to='/dashboard/profile/edit-profile' className="btn btn-primary mb-3">No</Link>
                </div>
            </div>
        </div>
    )
}

export default DeleteProfile