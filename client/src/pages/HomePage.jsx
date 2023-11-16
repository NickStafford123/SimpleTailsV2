import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
    const navigate = useNavigate();
    const [drinks, setDrinks] = useState([]);
    const [filter, setFilter] = useState('');

    // Fetch drinks from the server
    useEffect(() => {
        const fetchDrinks = async () => {
            const response = await axios.get('http://localhost:8000/api/drinks/allDrinks');
            setDrinks(response.data);
        };

        fetchDrinks();
    }, []);

    // Filter drinks based on the selected liquor type
    const filteredDrinks = filter ? drinks.filter(drink => drink.liquor === filter) : drinks;

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Handle navigation to Add New Drink Page
    const handleAddNewDrink = () => {
        navigate('/add');
    };

    // Handle drink view
    const handleViewDrink = (id) => {
        navigate(`/${id}`);
    };

    const formatFilterText = (filter) =>{
        if (!filter) return 'All Drinks'
        return `${filter}`
    }

    return (
        <div className='container mx-auto px-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Simple Tails</h1>
                <div>
                    <button 
                        className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5' 
                        onClick={handleAddNewDrink}
                    >
                        Create New Drink
                    </button>
                    <button 
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                   
                </div>
            </div>

            <div className='mt-8'>
                <h2 className='text-xl font-semibold'>Simple drink recipes!</h2>
                <h3 className='text-lg font-medium mt-4'>{formatFilterText(filter)}</h3>
                <select 
                    className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    onChange={e => setFilter(e.target.value)}
                    value={filter}
                >
                    <option value=''>Apply Filter</option>
                    <option value='Vodka'>Vodka</option>
                    <option value='Tequila'>Tequila</option>
                    <option value='Rum'>Rum</option>
                    <option value='Whiskey'>Whiskey</option>
                </select>

                <ul className='mt-4'>
                    {filteredDrinks.map(drink => (
                        <li key={drink._id} className='mt-2 font-bold text-lg'>
                            {drink.name} - 
                            <button 
                                className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded' 
                                onClick={() => handleViewDrink(drink._id)}
                            >
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default HomePage;
