import { useNavigate } from 'react-router-dom';
import './RegisterThankyou.css';
import { useAppContext } from '../../context/appContext';
import { useEffect } from 'react';
import { Card } from 'flowbite-react';

const illustrationImgUrl =
    'https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-18058.jpg?w=740&t=st=1698823690~exp=1698824290~hmac=41e84d529803c0767a2b6ac15a56d8619021bb45bdf3f4a614468bb9d620b821';

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
                <div className="register-thankyou-page">
                    <Card
                        theme={{
                            root: {
                                children:
                                    'flex w-full h-full flex-col justify-center p-6 items-center',
                            },
                        }}
                    >
                        <img src={illustrationImgUrl} alt="thank you" />
                        <h1>Welcome to Radast 🚀</h1>
                        <p>
                            Your registration has been successfully completed.
                        </p>
                        <br />
                        <ol>
                            <li>
                                There's only one step left. Check your inbox and
                                verify your email from the link we've just sent
                                you.
                            </li>
                        </ol>
                        <p>
                            If you have any questions or need assistance, feel
                            free to contact us by calling 012-3-457-789
                        </p>
                    </Card>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default RegisterThankyou;
