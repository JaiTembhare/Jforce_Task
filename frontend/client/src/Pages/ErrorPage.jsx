import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const { state } = useLocation();
    const { data } = state;
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);

    }, [])
    return (
        <>
            <div>ErrorPage</div>
            <h2>
                Error: {JSON.stringify(data)}
            </h2>
        </>


    )
}

export default ErrorPage