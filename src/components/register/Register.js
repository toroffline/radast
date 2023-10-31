import { Button, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import * as yup from 'yup';
import CommonUtil from '../../utils/commonUtil';

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
        validateOnBlur: true,
        validateOnChange: true,
    });
    const {
        errors,
        isSubmitting,
        setValues,
        setSubmitting,
        validateForm,
        setFieldValue,
    } = form;
    const queryParams = new URLSearchParams(location.search);

    async function validate() {
        console.groupCollapsed('submit form');
        setSubmitting(true);
        await validateForm().then((errors) => {
            if (errors && !CommonUtil.isObjectEmpty(errors)) {
                console.log({ errors });
            } else {
                console.log('form valid');
            }
        });
        console.groupEnd('submit form');
    }

    function getFieldStyle(fieldName) {
        return isSubmitting && errors && errors[fieldName] ? 'failure' : '';
    }

    function getError(field) {
        return isSubmitting && errors && errors[field] ? (
            <>{errors[field]}</>
        ) : (
            <></>
        );
    }

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
        <form
            onSubmit={(e) => {
                e.preventDefault();
                validate();
            }}
        >
            <TextInput
                placeholder="First name"
                value={form.values.firstName ?? ''}
                onChange={(e) => {
                    setFieldValue('firstName', e.target.value);
                }}
                color={getFieldStyle('firstName')}
            />
            {getError('firstName')}
            <TextInput
                placeholder="Last name"
                value={form.values.lastName ?? ''}
                onChange={(e) => setFieldValue('lastName', e.target.value)}
                color={getFieldStyle('lastName')}
            />
            {getError('lastName')}
            <TextInput
                placeholder="Phone number"
                value={form.values.phone ?? ''}
                onChange={(e) => setFieldValue('phone', e.target.value)}
                color={getFieldStyle('phone')}
            />
            {getError('phone')}
            <TextInput
                placeholder="Email"
                value={form.values.email ?? ''}
                onChange={(e) => setFieldValue('email', e.target.value)}
                color={getFieldStyle('email')}
            />
            {getError('email')}
            <TextInput
                placeholder="Ref."
                value={form.values.ref ?? ''}
                onChange={(e) => setFieldValue('ref', e.target.value)}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}

export default Register;
