import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DoVote = () => {

    const [selectedCandidate, setSelectedCandidate] = useState(0);

    const navigate = useNavigate();

    const handleVote = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform voting logic with the selected candidate

        const urlVote = `${process.env.REACT_APP_BACKEND_API}/users/vote`;
        const vote = {
            vote: selectedCandidate
        };
        console.log('Voted for candidate:', vote);

        await axios.post(urlVote, vote)
            .then((response) => {
                console.log("voted :", response.data);
                Cookies.remove('token');
                navigate("/success");
            }).catch((error) => {
                console.error('An error occurred', error);
                Cookies.remove('token');

                let errorMessage;
                try {
                    const data = JSON.parse(error.message);
                    errorMessage = data.message; // Replace 'message' with the actual property containing the error message
                } catch (jsonError) {
                    errorMessage = 'An unexpected error occurred.';
                }

                navigate("/error", { state: { data: errorMessage } });
            })

    };


    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-center'>
                <h1>Do Vote</h1>
            </div>
            <form onSubmit={handleSubmit} method='post'>
                <div className='mb-3'>
                    <label className='form-check-label'>
                        <input
                            type='radio'
                            name='candidate'
                            id='1'
                            value='1'
                            checked={selectedCandidate === 1}
                            onChange={() => handleVote(1)}
                            className='form-check-input'
                        />
                        Candidate 1
                    </label>
                </div>

                <div className='mb-3'>
                    <label className='form-check-label'>
                        <input
                            type='radio'
                            name='candidate'
                            id='2'
                            value='2'
                            checked={selectedCandidate === 2}
                            onChange={() => handleVote(2)}
                            className='form-check-input'
                        />
                        Candidate 2
                    </label>
                </div>

                <div className='mb-3'>
                    <label className='form-check-label'>
                        <input
                            type='radio'
                            name='candidate'
                            id='3'
                            value='3'
                            checked={selectedCandidate === 3}
                            onChange={() => handleVote(3)}
                            className='form-check-input'
                        />
                        Candidate 3
                    </label>
                </div>

                <div className='mb-3'>
                    <label className='form-check-label'>
                        <input
                            type='radio'
                            name='candidate'
                            id='4'
                            value='4'
                            checked={selectedCandidate === 4}
                            onChange={() => handleVote(4)}
                            className='form-check-input'
                        />
                        Candidate 4
                    </label>
                </div>

                <div className='mb-3'>
                    <button type='submit' className='btn btn-primary'>
                        Vote
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DoVote