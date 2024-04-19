import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {type FunctionComponent, useCallback, useState} from 'react';
import {date, nativeEnum, object, string} from 'zod';

import {Alert, type AlertContext, Button, Form} from '@jupiter/ui-react';

import {AuthAPI} from '@/api';
import {Logo} from '@/components/Logo';
import {Page} from '@/components/Page';
import {userLogInMutation, userRegisterMutation} from '@/core/mutations';
import Gender, {displayGender} from '@/enums/Gender';
import {RequestError} from '@/errors/RequestError';
import {useRouter} from '@/hooks/useRouter';
import {enumToSelectOptions} from '@/utilities/forms';

const registerFormSchema = object({
    birthday: date(),
    email: string().email('A valid email address is required.'),
    first_name: string().min(1, 'A first name is required.'),
    gender: nativeEnum(Gender),
    last_name: string().min(1, 'A last name is required.'),
    password: string().min(1, 'A password is required.'),
    password_confirm: string().min(1, 'Please confirm your password.'),
});

export const RegisterPage: FunctionComponent = () => {
    const queryClient = useQueryClient();
    const {
        mutateAsync: registerUser,
        isPending: isRegistering,
    } = useMutation(userRegisterMutation(queryClient));
    const {
        mutateAsync: logInUser,
        isPending: isAuthenticating,
    } = useMutation(userLogInMutation(queryClient));

    const router = useRouter();

    const [alertContext, setAlertContext] = useState<AlertContext>();

    const onRegister = useCallback(
        async (values: AuthAPI.RegisterUserPayload) => {
            try {
                await registerUser(values);

                await logInUser({
                    email: values.email,
                    password: values.password,
                });

                await router.push('/app');
            } catch (error) {
                if (error instanceof RequestError) {
                    setAlertContext(error.toAlertContext());
                    return;
                }

                console.error(error);

                if (error instanceof Error) {
                    setAlertContext({
                        type: 'error',
                        title: 'An Unknown Error Occurred',
                        description: error.message,
                    });

                    return;
                }

                setAlertContext({
                    type: 'error',
                    title: 'Fatal Error',
                    description: 'An unknown error occurred. Please try again later.',
                });
            }
        },
        [logInUser, registerUser, router],
    );

    return (
        <Page name="RegisterPage">
            <main className="flex-1 flex flex-col items-center justify-center p-8 mx-auto w-full max-w-md">
                <div className="flex flex-col justify-center items-center self-stretch gap-10 rounded-md">
                    <Link to="/">
                        <Logo showText />
                    </Link>

                    <div className="flex flex-col gap-3 text-center">
                        <h1 className="text-3xl font-medium tracking-tighter text-black">
                            Create an Account
                        </h1>
                    </div>

                    <Alert
                        classNames={{
                            root: 'my-4',
                            descriptionItemContainer: 'items-center',
                        }}
                        context={alertContext}
                        onClose={() => setAlertContext(undefined)}
                    />

                    <Form
                        schema={registerFormSchema}
                        className="w-80"
                        initialValues={{
                            birthday: new Date(),
                            email: '',
                            first_name: '',
                            gender: Gender.Other,
                            last_name: '',
                            password: '',
                            password_confirm: '',
                        }}
                        onSubmit={onRegister}
                    >
                        {control => (
                            <div className="flex flex-col gap-y-4">
                                <div className="flex gap-3 items-end">
                                    <Form.Text
                                        type="text"
                                        control={control}
                                        label="First Name"
                                        name="first_name"
                                        placeholder="First name"
                                    />
                                    <Form.Text
                                        type="text"
                                        control={control}
                                        label="Last Name"
                                        name="last_name"
                                        placeholder="Last name"
                                    />
                                </div>
                                <div className="flex [&>*]:flex-1">
                                    <Form.Text
                                        type="email"
                                        control={control}
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <Form.SimpleSelect
                                        control={control}
                                        label="Gender"
                                        name="gender"
                                        options={enumToSelectOptions(Gender, displayGender)}
                                    />
                                </div>
                                <div>
                                    <Form.Date
                                        control={control}
                                        fromDate={new Date('January 1, 1970')}
                                        label="Date of birth"
                                        name="birthday"
                                        placeholder="Pick a date"
                                        toDate={new Date()}
                                    />
                                </div>
                                <div>
                                    <Form.Password
                                        control={control}
                                        label="Password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <Form.Password
                                        control={control}
                                        label="Confirm Password"
                                        name="password_confirm"
                                        placeholder="Confirm your password"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isAuthenticating || isRegistering}
                                    classNames={{
                                        root: 'self-stretch',
                                    }}
                                    variant="primary"
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                    </Form>

                    <div>
                        <p className="text-sm">
                            Already have an account?&nbsp;
                        </p>

                        <Link
                            to="/login"
                            className="text-sm underline font-medium"
                        >
                            Log in.
                        </Link>
                    </div>
                </div>
            </main>
        </Page>
    );
};
