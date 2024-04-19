import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {type FunctionComponent, useMemo} from 'react';
import {object, string} from 'zod';

import {Alert, type AlertContext, Button, Form, Text} from '@jupiter/ui-react';

import {Logo} from '@/components/Logo';
import {Page} from '@/components/Page';
import {userLogInMutation} from '@/core/mutations';
import {useRouter} from '@/hooks/useRouter';
import {Route as LoginRoute} from '@/routes/login';

const loginFormSchema = object({
    email: string().email('A valid email address is required.'),
    password: string().min(1, 'A password is required.'),
});

export const LoginPage: FunctionComponent = () => {
    const router = useRouter();
    const {redirect, view} = LoginRoute.useSearch();
    const navigate = LoginRoute.useNavigate();

    const queryClient = useQueryClient();
    const {
        mutateAsync: logInUser,
        isPending: isSubmitting,
    } = useMutation(userLogInMutation(queryClient));

    const alertContext = useMemo<AlertContext | undefined>(
        () => {
            return view === 'log_out' ? {
                type: 'success',
                title: 'Logged Out',
                description: 'You have been successfully logged out.',
            } : view === 'unauth' ? {
                type: 'error',
                title: 'Unauthorized',
                description: 'You are not logged in. Please log back in.',
            } : undefined
        },
        [view]
    );

    return (
        <Page name="LoginPage">
            <main className="flex-1 flex flex-col items-center justify-center p-8 mx-auto w-full max-w-md">
                <div className="flex flex-col justify-center items-center self-stretch gap-y-2 rounded-md">
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        <Link to="/">
                            <Logo showText />
                        </Link>

                        <div className="flex flex-col gap-y-1 text-center">
                            <Text as="h2">
                                Welcome back!
                            </Text>

                            <Text as="h4" className="tracking-tighter">
                                Log in to your account
                            </Text>
                        </div>
                    </div>

                    <Alert
                        classNames={{
                            root: 'my-4',
                        }}
                        context={alertContext}
                        onClose={() => navigate({
                            to: LoginRoute.fullPath,
                            search: {
                                redirect,
                                view: undefined,
                            },
                        })}
                    />

                    <Form
                        schema={loginFormSchema}
                        className="w-80 flex flex-col gap-y-4"
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={async values => {
                            await logInUser(values);
                            await router.push(redirect ?? '/app');
                        }}
                    >
                        {control => (
                            <div
                                className="flex flex-col gap-y-4"
                            >
                                <Form.Text
                                    type="email"
                                    control={control}
                                    label="Email"
                                    name="email"
                                    placeholder="Email"
                                />

                                <Form.Password
                                    control={control}
                                    label="Password"
                                    name="password"
                                    placeholder="Password"
                                />

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    actionIndicatorSize="lg"
                                    classNames={{
                                        root: 'self-stretch',
                                    }}
                                    variant="primary"
                                >
                                    Log In
                                </Button>
                            </div>
                        )}
                    </Form>

                    <div>
                        <p className="text-center text-sm">
                            Don&apos;t have an account?&nbsp;
                        </p>

                        <Link
                            to="/register"
                            className="text-sm underline font-medium"
                        >
                            Sign up here.
                        </Link>
                    </div>
                </div>
            </main>
        </Page>
    );
}
