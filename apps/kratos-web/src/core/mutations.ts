import {type MutationOptions, type QueryClient} from '@tanstack/react-query';

import {AuthAPI} from '@/api';
import {userFetchQuery} from '@/core/queries';
import {type User} from '@/parsers/authParsers';

function mutationOptions<
    TData = unknown,
    TVariables = unknown,
    TError = unknown,
    TContext = unknown,
>(options: MutationOptions<TData, TError, TVariables, TContext>): MutationOptions<TData, TError, TVariables, TContext> {
    return options;
}

export const userLogInMutation = (queryClient: QueryClient) => mutationOptions<User, AuthAPI.LoginUserPayload>({
    mutationKey: ['user', 'login'],
    mutationFn: async (payload) => {
        return AuthAPI.login(payload);
    },
    onSuccess: (user) => {
        queryClient.setQueryData(userFetchQuery().queryKey, user);
    },
});

export const userLogOutMutation = (queryClient: QueryClient) => mutationOptions<void, void>({
    mutationKey: ['user', 'logout'],
    mutationFn: async () => {
        return AuthAPI.logout();
    },
    onSuccess: () => {
        queryClient.clear();
    },
});

export const userRegisterMutation = (queryClient: QueryClient) => mutationOptions<User, AuthAPI.RegisterUserPayload>({
    mutationKey: ['user', 'register'],
    mutationFn: async (payload) => {
        return AuthAPI.register(payload);
    },
    onSuccess: (user) => {
        queryClient.setQueryData(userFetchQuery().queryKey, user);
    },
});
