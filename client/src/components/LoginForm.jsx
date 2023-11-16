import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', { email, password });
            console.log(response.data);
            
            // Store the token in localStorage (or any other state management solution)
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                navigate('/home'); // Navigate to the Home Page
            } else {
                // Handle cases where there is no token in the response
                console.error('Login successful but no token received');
            }
        } catch (error) {
            let errorMessage = 'Failed to perform action'
            if (error.response) {
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    errorMessage = error.response.data.errors.join(',')
                } else if (error.response.data){
                    errorMessage = error.response.data
                }
            }
            setError(errorMessage)
            console.error(error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-75'>
            <div className='mb-4'>
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
            />
            </div>
            <div className='mb-4'>
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
            />
            {error && <div className='alert alert-danger'>{error}</div>}
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
        </form>
    );
}

export default LoginForm;

