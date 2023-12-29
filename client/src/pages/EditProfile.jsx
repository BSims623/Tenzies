import React from 'react'
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { useDashboardContext } from './Dashboard'
import { toast } from 'react-toastify';

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 3000000) {
        toast.error('image size too large')
        return null
    }
    try {
        await customFetch.patch('/users/update-user', formData)
        queryClient.invalidateQueries(['stats']);
        toast.success('Profile updated successfully')
        return redirect('/dashboard/profile')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return null
    }
}

const EditProfile = () => {
    const { user } = useDashboardContext();

    return (
        <div>
            <div style={{ minHeight: '100vh' }} className='h-100 d-flex justify-content-center align-items-center bg-dark'>
                <Form method='post' className='container-fluid' encType='multipart/form-data'>
                    <h1 className='fw-bold my-4 text-danger'>Edit Profile</h1>
                    <div className="form-group mb-3">
                        <label htmlFor="firstName" className="text-light"><h4>First Name</h4></label>
                        <input name='firstName' type="text" className="form-control" id="firstName" defaultValue={user.firstName} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="lastName" className="text-light"><h4>Last Name</h4></label>
                        <input name='lastName' type="text" className="form-control" id="lastName" defaultValue={user.lastName} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="location" className="text-light"><h4>Location</h4></label>
                        <input name='location' type="text" className="form-control" id="location" defaultValue={user.location} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="text-light" htmlFor="avatar">
                            <h4>Select an image file (max 3 MB)</h4>
                        </label>
                        <input className='text-light' type="file" id='avatar' name='avatar' accept='image/*' />
                    </div>
                    <div className="buttonContainer mt-4 d-flex flex-column justify-content-center">
                        <button className="btn btn-primary mb-3" type="submit" >Submit Changes</button>
                        <Link to='/dashboard/profile/delete-profile' className="btn btn-danger mb-3">Delete Profile</Link>
                    </div>
                </Form>
            </div >
        </div >

    )
}

export default EditProfile