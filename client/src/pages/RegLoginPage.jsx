import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

function RegLoginPage() {
    return (
        <div>
            <h1 className='text-4xl font-bold'>Simple Tails</h1>
            <div className='flex justify-between'>
                <div className='w-1/2 p-4'>
                    <h2 className='font-bold text-4xl'>Register</h2>
                    <RegistrationForm />
                </div>
                <div className='w-1/2 p-4'>
                    <h2 className='font-bold text-4xl'>Login</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default RegLoginPage;
