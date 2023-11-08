import { Button, Card } from 'flowbite-react';
import { useFormik } from 'formik';
import { useEffect, useState, useCallback } from 'react';
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

const fieldDisplay = {
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone number',
    email: 'Email',
    ref: 'Referral',
};

const commonError = {
    required: '{field} is required',
    notEmpty: '{field} is not empty',
    invalid: `{field} is invalid`,
};

const schemaError = {
    firstName: {
        required: commonError.required.replace(
            '{field}',
            fieldDisplay.firstName
        ),
        notEmpty: commonError.notEmpty.replace(
            '{field}',
            fieldDisplay.firstName
        ),
    },
    lastName: {
        required: commonError.required.replace(
            '{field}',
            fieldDisplay.lastName
        ),
        notEmpty: commonError.notEmpty.replace(
            '{field}',
            fieldDisplay.lastName
        ),
    },
    phone: {
        required: commonError.required.replace('{field}', fieldDisplay.phone),
    },
    email: {
        required: commonError.required.replace('{field}', fieldDisplay.email),
        invalid: commonError.invalid.replace('{field}', fieldDisplay.email),
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

const illustrationImgUrl =
    'https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=740&t=st=1698810211~exp=1698810811~hmac=bea1e68ff31574f189c99df4ac39b2853e4dae2c7714aac9065d22adff5830d3';

function Register() {
    const location = useLocation();
    const { isMobile, setOneTimeRegister } = useAppContext();
    const form = useFormik({
        initialValues: defaultUserInfo,
        validationSchema: schema,
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
    });
    const {
        values,
        errors: actualErrors,
        setValues,
        validateForm,
        setFieldValue,
    } = form;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const queryParams = new URLSearchParams(location.search);

    async function validate() {
        setIsSubmitted(true);
        await validateForm().then(async (errors) => {
            setErrors(errors);
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
            <section className="register-page">
                <h1 className="text-white">Prepare to Radast 📡</h1>
                <Card
                    imgSrc={isMobile ? undefined : illustrationImgUrl}
                    horizontal={!isMobile}
                    theme={{
                        root: {
                            base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
                            horizontal: {
                                on: 'flex-col md:flex-row',
                            },
                            children:
                                'flex w-full h-full flex-col justify-center p-6',
                        },
                        img: {
                            horizontal: {
                                on: 'object-contain',
                            },
                        },
                    }}
                >
                    {isMobile && (
                        <img
                            src={illustrationImgUrl}
                            className="w-full"
                            alt="register"
                        />
                    )}
                    <h2 className="text-center">
                        New users? Let's get you started!
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            validate();
                        }}
                    >
                        <Field isError={!!errors['firstName']}>
                            <InputFloatingLabel
                                label={fieldDisplay.firstName}
                                value={form.values.firstName ?? ''}
                                onChange={(value) => {
                                    setFieldValue('firstName', value);
                                }}
                                color={getFieldStyle('firstName')}
                                disabled={isProcessing}
                            />
                            <Error
                                field="firstName"
                                isSubmitted={isSubmitted}
                                errors={errors['firstName']}
                            />
                        </Field>

                        <Field isError={!!errors['lastName']}>
                            <InputFloatingLabel
                                label={fieldDisplay.lastName}
                                value={form.values.lastName ?? ''}
                                onChange={(value) => {
                                    setFieldValue('lastName', value);
                                }}
                                color={getFieldStyle('lastName')}
                                disabled={isProcessing}
                            />
                            <Error
                                field="firstName"
                                isSubmitted={isSubmitted}
                                errors={errors['lastName']}
                            />
                        </Field>

                        <Field isError={!!errors['phone']}>
                            <InputFloatingLabel
                                label={fieldDisplay.phone}
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
                        </Field>

                        <Field isError={!!errors['email']}>
                            <InputFloatingLabel
                                label={fieldDisplay.email}
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
                        </Field>

                        <Field>
                            <InputFloatingLabel
                                label={fieldDisplay.ref}
                                value={form.values.ref ?? ''}
                                onChange={(value) => {
                                    setFieldValue('ref', value);
                                }}
                                disabled={isProcessing}
                            />
                        </Field>

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

function Field(props) {
    const { children, isError } = props;
    return (
        <div className={`relative ${isError ? 'mb-1' : 'mb-7'}`}>
            {children}
        </div>
    );
}

export default Register;
