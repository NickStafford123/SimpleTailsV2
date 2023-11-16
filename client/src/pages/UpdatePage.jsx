import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DrinkForm from '../components/DrinkForm';

function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drinkData, setDrinkData] = useState(null);

    useEffect(() => {
        const fetchDrinkData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.get(`http://localhost:8000/api/drinks/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                setDrinkData(response.data);
            } catch (error) {
                console.error('Error fetching drink data:', error);
                // Optional: Redirect to login page if the token is invalid or missing
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchDrinkData();
    }, [id, navigate]); 

    const handleHomeClick = () => {
        navigate('/home');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-2xl font-bold mb-4'>Simple Tails</h1>
            <div  className='flex justify-between mb-6'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleHomeClick}
             >
                Home
             </button>
            <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleLogoutClick}
             >
                Logout
            </button>
            </div>
            {drinkData && <DrinkForm initialData={drinkData} />}
        </div>
    );
}

export default UpdatePage;

