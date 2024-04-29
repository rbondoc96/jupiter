import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {type FunctionComponent, useCallback, useState} from 'react';
import {object, string} from 'zod';

import {Alert, type AlertContext, Button, Form} from '@jupiter/ui-react';

import {AuthAPI} from '@/api';
import {Logo} from '@/components/Logo';
import {Page} from '@/components/Page';
import {userRegisterMutation} from '@/core/mutations';
import {RequestError} from '@/errors/RequestError';
import {useRouter} from '@/hooks/useRouter';

const registerFormSchema = object({
    email: string().email('A valid email address is required.'),
    first_name: string().min(1, 'A first name is required.'),
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

    const router = useRouter();

    const [alertContext, setAlertContext] = useState<AlertContext>();

    const onRegister = useCallback(
        async (values: AuthAPI.RegisterUserPayload) => {
            try {
                await registerUser(values);
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
        [registerUser, router],
    );

    return (
        <Page name="RegisterPage">
            <main className="flex-1 flex flex-col items-center justify-center p-8 mx-auto w-full max-w-md">
                <div className="flex flex-col justify-center items-center self-stretch gap-y-4 rounded-md">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        <Link to="/">
                            <Logo showText />
                        </Link>

                        <div className="flex flex-col gap-y-1 text-center">
                            <h2 className="text-2xl lg:text-3xl tracking-tighter">
                                Create an Account
                            </h2>
                        </div>
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
                        className="flex flex-col gap-y-4 w-full"
                        initialValues={{
                            email: '',
                            first_name: '',
                            last_name: '',
                            password: '',
                            password_confirm: '',
                        }}
                        onSubmit={onRegister}
                    >
                        {control => (
                            <div className="flex flex-col gap-y-4">
                                <div className="flex gap-x-3 items-end">
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
                                    <Form.Password
                                        control={control}
                                        label="Password"
                                        name="password"
                                        placeholder="Password"
                                        classNames={{
                                            revealPassword: {
                                                toggle: 'border',
                                            },
                                        }}
                                    />
                                </div>
                                <div>
                                    <Form.Password
                                        control={control}
                                        label="Confirm Password"
                                        name="password_confirm"
                                        placeholder="Confirm your password"
                                        classNames={{
                                            revealPassword: {
                                                toggle: 'border',
                                            },
                                        }}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isRegistering}
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

                    <div className="self-stretch flex flex-col items-center gap-y-1">
                        <p className="text-sm">
                            Already have an account?&nbsp;
                        </p>

                        <Link
                            to="/login"
                            // Prevent calls to /api/auth when the link is hovered
                            preload={false}
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
