import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);

    }, [])


    return (
        <h1>Cogradulations You have Voted Successfully !!!</h1>

    )
}

export default Success