import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DrinkForm({ initialData }) {
    const navigate = useNavigate();
    const [name, setName] = useState(initialData ? initialData.name :'');
    const [recipe, setRecipe] = useState(initialData ? initialData.recipe :'');
    const [liquor, setLiquor] = useState(initialData ? initialData.liquor :'');
    const [picture, setPicture] = useState(null);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('recipe', recipe);
        formData.append('liquor', liquor);
        if (picture) {
            formData.append('picture', picture);
        }
    
        const token = localStorage.getItem('token');
    
        try {
            let response;
            if (initialData) {
                // Update existing drink
                response = await axios.put(`http://localhost:8000/api/drinks/${initialData._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                // Create new drink
                response = await axios.post('http://localhost:8000/api/drinks/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            console.log(response.data);
            navigate(`/home`); 
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-75'>
            <div className='mb-4'>
                <input 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    type='text' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder='Name' 
                    required 
                />
            </div>
            <div className='mb-4'>
                <textarea 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    value={recipe} 
                    onChange={(e) => setRecipe(e.target.value)} 
                    placeholder='Recipe' 
                    required 
                />
            </div>
            <div className='mb-4'>
                <select 
                    className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    value={liquor} 
                    onChange={(e) => setLiquor(e.target.value)} 
                    required
                >
                    <option value=''>Select Liquor Type</option>
                    <option value='Vodka'>Vodka</option>
                    <option value='Tequila'>Tequila</option>
                    <option value='Rum'>Rum</option>
                    <option value='Whiskey'>Whiskey</option>
                </select>
            </div>
            <div className='mb-6'>
                <input 
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    type='file' 
                    onChange={(e) => setPicture(e.target.files[0])} 
                />
            </div>
            <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
                type='submit'
            >
                Submit
            </button>
        </form>
    );
}

export default DrinkForm;

