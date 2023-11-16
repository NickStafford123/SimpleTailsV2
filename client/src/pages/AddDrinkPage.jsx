import { useNavigate } from 'react-router-dom';
import DrinkForm from '../components/DrinkForm';

function AddDrinkPage() {
    const navigate = useNavigate();

    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-2xl font-bold mb-4'>Simple Tails</h1>
            <div className='flex justify-between mb-6'>
                <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                    onClick={() => navigate('/home')}
                >
                    Home
                </button>
                <button 
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
                    onClick={() => navigate('/')}
                >
                    Logout
                </button>
            </div>
            <h2 className='text-xl font-semibold mb-4'>New Drink</h2>
            <DrinkForm />
        </div>
    );
}

export default AddDrinkPage;
