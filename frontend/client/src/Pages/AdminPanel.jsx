import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../axiosConfig';
import Cookies from 'js-cookie';
import { useNavigate, useNavigationType } from 'react-router-dom';

const AdminPanel = () => {

    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([{}]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const urlAdmin = `${process.env.REACT_APP_BACKEND_API}/users/vote`;
                const response = await axios.get(urlAdmin);
                setCandidates(response.data);
                console.table(response.data);

            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []); // Empty dependency array means this effect runs once on component mount

    // console.log("candidates", candidates);
    // console.log("candidate 1 :", candidates[0].candidate1);
    // console.log("candidate value : ", candidates[0]['candidate1'])

    const handleLogout = () => {
        console.log('logged out');
        Cookies.remove('token');
        navigate('/');

    }

    return (
        <div className="container mt-4">
            <h2>Admin Panel</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Candidate</th>
                        <th scope="col">Votes</th>
                    </tr>
                </thead>
                {candidates.length > 0 ? (
                    Object.keys(candidates[0]).map((candidate, index) => (
                        <tr key={index}>
                            <td>{candidate != '_id' && candidate != 'updatedAt' && candidate}</td>
                            <td>{candidate != '_id' && candidate != 'updatedAt' && candidates[0][candidate]}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">No candidates available</td>
                    </tr>
                )}
                <tbody>

                </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default AdminPanel;