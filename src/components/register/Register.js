import { Button, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import * as yup from 'yup';

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
};

const schema = yup.object().shape({
    firstName: yup.string().trim().required(schemaError.firstName.required),
    lastName: yup.string().trim().required(schemaError.lastName.required),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
});

function Register() {
    const location = useLocation();
    const form = useFormik({
        initialValues: defaultUserInfo,
        validationSchema: schema,
        validateOnMount: false,
        validateOnBlur: false,
        validateOnChange: false,
    });
    const { values, errors, validateForm, setFieldValue } = form;
    const queryParams = new URLSearchParams(location.search);

    async function validate() {
        console.groupCollapsed('submit form');
        await validateForm().then((errors) => {
            if (errors) {
                console.log({ errors });
            } else {
                console.log('form valid');
            }
        });
        console.groupEnd('submit form');
    }

    useEffect(() => {
        const firstName = queryParams.get('firstName') ?? '';
        const lastName = queryParams.get('lastName') ?? '';
        const phone = queryParams.get('phone') ?? '';
        const email = queryParams.get('email') ?? '';
        const ref = queryParams.get('ref') ?? '';

        setFieldValue({
            firstName,
            lastName,
            phone,
            email,
            ref,
        });
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                validate();
            }}
        >
            <TextInput
                placeholder="First name"
                defaultValue={form.values.firstName}
                onChange={(e) => {
                    setFieldValue('firstName', e.target.value ?? '');
                }}
                color={errors && errors['firstName'] ? 'failure' : ''}
            />
            {errors && errors['firstName']}
            <TextInput
                placeholder="Last name"
                defaultValue={form.values.lastName}
                value={form.values.lastName}
                onChange={(e) => setFieldValue('lastName', e.target.value)}
                color={errors && errors['lastName'] ? 'failure' : ''}
            />
            <TextInput
                placeholder="Phone number"
                defaultValue={form.values.phone}
                value={form.values.phone}
                onChange={(e) => setFieldValue('phone', e.target.value)}
                color={errors && errors['phone'] ? 'failure' : ''}
            />
            <TextInput
                type="email"
                placeholder="Email"
                defaultValue={form.values.email}
                value={form.values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
                color={errors && errors['email'] ? 'failure' : ''}
            />
            <TextInput
                placeholder="Ref."
                defaultValue={form.values.ref}
                value={form.values.ref}
                onChange={(e) => setFieldValue('ref', e.target.value)}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}

export default Register;
