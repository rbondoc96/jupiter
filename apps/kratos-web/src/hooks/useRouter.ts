import {useNavigate} from '@tanstack/react-router';

export function useRouter() {
    const navigate = useNavigate();

    return {
        pop: (replace = false) => navigate({to: '..', replace}),
        push: (to: string, search: Record<string, unknown> = {}) => navigate({to, replace: false, search}),
        replace: (to: string, search: Record<string, unknown> = {}) => navigate({to, replace: true, search}),
    };
}
