import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drink, setDrink] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchDrink = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/drinks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDrink(response.data);
                const userId = localStorage.getItem('userId'); // Assuming the user's ID is stored in local storage
                setIsOwner(response.data.user === userId);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchDrink();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/drinks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/home');
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    if (!drink) return <div>Loading...</div>;


    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-2xl font-bold mb-4'>Simple Tails</h1>
            <div className='flex justify-between items-center mb-6'>
                <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                    onClick={() => navigate('/home')}
                >
                    Home
                </button>
                <button 
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}
                >
                    Logout
                </button>
            </div>
            <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-50'>
                <h2 className='text-xl font-semibold mb-4'>{drink.name}</h2>
                <h2>Post by: {drink.user.fullname}</h2>
                {drink.picture && (
                    <div className='flex justify-center'>
                    <img 
                        src={`http://localhost:8000/${drink.picture}`} 
                        alt={drink.name} 
                        className='w-64 h-auto mb-4'
                    />
                    </div>
                )}
                <p className='mb-4'>{drink.recipe}</p>
                {isOwner && (
                    <div className='flex justify-between'>
                        <button 
                            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' 
                            onClick={() => navigate(`/update/${id}`)}
                        >
                            Edit
                        </button>
                        <button 
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsPage;

