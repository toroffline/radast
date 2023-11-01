import { Button, Card } from 'flowbite-react';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import * as yup from 'yup';
import CommonUtil from '../../utils/commonUtil';
import InputFloatingLabel from '../../components/floatingLabel/FloatingLabel';
import './Register.css';
import { useAppContext } from '../../context/appContext';
import userService from '../../services/userService';

const defaultUserInfo = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    ref: '',
};

const commonError = {
    required: '{field} is required',
    notEmpty: '{field} is not empty',
    invalid: `{field} is invalid`,
};

const schemaError = {
    firstName: {
        required: commonError.required.replace('{field}', 'firstName'),
        notEmpty: commonError.notEmpty.replace('{field}', 'firstName'),
    },
    lastName: {
        required: commonError.required.replace('{field}', 'lastName'),
        notEmpty: commonError.notEmpty.replace('{field}', 'lastName'),
    },
    phone: {
        required: commonError.required.replace('{field}', 'phone'),
    },
    email: {
        required: commonError.required.replace('{field}', 'email'),
        invalid: commonError.invalid.replace('{field}', 'email'),
    },
};

const schema = yup.object().shape({
    firstName: yup.string().trim().required(schemaError.firstName.required),
    lastName: yup.string().trim().required(schemaError.lastName.required),
    phone: yup
        .string()
        .required(schemaError.phone.required)
        .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    email: yup
        .string()
        .required(schemaError.email.required)
        .email(schemaError.email.invalid),
});

function Register() {
    const location = useLocation();
    const { setOneTimeRegister } = useAppContext();
    const form = useFormik({
        initialValues: defaultUserInfo,
        validationSchema: schema,
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
    });
    const { values, errors, setValues, validateForm, setFieldValue } = form;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const queryParams = new URLSearchParams(location.search);

    async function validate() {
        setIsSubmitted(true);
        await validateForm().then(async (errors) => {
            if (!errors || CommonUtil.isObjectEmpty(errors)) {
                setIsProcessing(true);
                await userService
                    .register(values)
                    .then((response) => {
                        if (response.code === 200) {
                            setOneTimeRegister(true);
                        }
                    })
                    .catch(() => {})
                    .finally(() => {
                        setIsProcessing(false);
                    });
            }
        });
    }

    const getFieldStyle = useCallback(
        (fieldName) => {
            return isSubmitted && errors && errors[fieldName] ? 'failure' : '';
        },
        [isSubmitted, errors]
    );

    useEffect(() => {
        const firstName = queryParams.get('firstName') ?? '';
        const lastName = queryParams.get('lastName') ?? '';
        const phone = queryParams.get('phone') ?? '';
        const email = queryParams.get('email') ?? '';
        const ref = queryParams.get('ref') ?? '';

        setValues({
            firstName,
            lastName,
            phone,
            email,
            ref,
        });
    }, []);

    return (
        <>
            <section className="h-screen w-full">
                <div className="h-full">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center xl:mb-4">
                        <div className="infographic">
                            <div className="text-wave">
                                Prepare to <span style={{ ['--i']: 1 }}>R</span>
                                <span style={{ ['--i']: 2 }}>a</span>
                                <span style={{ ['--i']: 3 }}>d</span>
                                <span style={{ ['--i']: 4 }}>a</span>
                                <span style={{ ['--i']: 5 }}>s</span>
                                <span style={{ ['--i']: 6 }}>t</span>
                            </div>
                            <img
                                src="https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=740&t=st=1698810211~exp=1698810811~hmac=bea1e68ff31574f189c99df4ac39b2853e4dae2c7714aac9065d22adff5830d3"
                                className="w-full"
                                alt="register"
                            />
                        </div>

                        <div className="register-form">
                            <Card>
                                <h2>New User ? Get Registered</h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validate();
                                    }}
                                >
                                    <div className="relative mb-6">
                                        <InputFloatingLabel
                                            label="First name"
                                            value={form.values.firstName ?? ''}
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'firstName',
                                                    value
                                                );
                                            }}
                                            color={getFieldStyle('firstName')}
                                            disabled={isProcessing}
                                        />
                                        <Error
                                            field="firstName"
                                            isSubmitted={isSubmitted}
                                            errors={errors['firstName']}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <InputFloatingLabel
                                            label="Last name"
                                            value={form.values.lastName ?? ''}
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'lastName',
                                                    value
                                                );
                                            }}
                                            color={getFieldStyle('lastName')}
                                            disabled={isProcessing}
                                        />
                                        <Error
                                            field="firstName"
                                            isSubmitted={isSubmitted}
                                            errors={errors['lastName']}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <InputFloatingLabel
                                            label="Phone number"
                                            value={form.values.phone ?? ''}
                                            onChange={(value) => {
                                                setFieldValue('phone', value);
                                            }}
                                            color={getFieldStyle('phone')}
                                            disabled={isProcessing}
                                        />
                                        <Error
                                            field="phone"
                                            isSubmitted={isSubmitted}
                                            errors={errors['phone']}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <InputFloatingLabel
                                            label="Email"
                                            value={form.values.email ?? ''}
                                            onChange={(value) => {
                                                setFieldValue('email', value);
                                            }}
                                            color={getFieldStyle('email')}
                                            disabled={isProcessing}
                                        />
                                        <Error
                                            field="email"
                                            isSubmitted={isSubmitted}
                                            errors={errors['email']}
                                        />
                                    </div>

                                    <div className="relative mb-6">
                                        <InputFloatingLabel
                                            label="Ref."
                                            value={form.values.ref ?? ''}
                                            onChange={(value) => {
                                                setFieldValue('ref', value);
                                            }}
                                            disabled={isProcessing}
                                        />
                                    </div>

                                    <div className="text-center lg:text-left">
                                        <div className="flex justify-center">
                                            <Button
                                                type="submit"
                                                pill
                                                isProcessing={isProcessing}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function Error(props) {
    const { isSubmitted, errors } = props;
    return isSubmitted && errors ? (
        <small className="text-red-600">{errors}</small>
    ) : (
        <></>
    );
}

export default Register;
