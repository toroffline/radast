import { useNavigate } from 'react-router-dom';
import './RegisterThankyou.css';
import { useAppContext } from '../../context/appContext';
import { useEffect } from 'react';

function RegisterThankyou() {
    const { oneTimeRegister } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!oneTimeRegister) {
            navigate('/user/register');
        }
    }, [oneTimeRegister]);

    return (
        <>
            {oneTimeRegister ? (
                <div className="flex flex-col items-center justify-center w-full pt-4">
                    <img
                        src="https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-18058.jpg?w=740&t=st=1698823690~exp=1698824290~hmac=41e84d529803c0767a2b6ac15a56d8619021bb45bdf3f4a614468bb9d620b821"
                        alt="thank you"
                    />
                    <h1>Thank You for Registering</h1>
                    <p>Your registration has been successfully completed.</p>
                    <ol>
                        <li>
                            Check your email for a confirmation message and
                            follow the instructions.
                        </li>
                    </ol>
                    <p>
                        If you have any questions or need assistance, feel free
                        to contact us by calling xxxx-yyyy-zzzz
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default RegisterThankyou;
